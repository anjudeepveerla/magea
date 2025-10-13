// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// Adjust this import to match your project helper.
// It should execute parameterized SQL and return rows (for SELECT) or an object with insertId for INSERT.
import { executeQuery } from "@/lib/db";

type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;          // accepts "9876543210" or "+919876543210"
  password: string;
  emailVerified?: boolean; // client may send, but you can ignore/validate server-side if you have OTP state
  phoneVerified?: boolean; // same as above
};

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

// Normalizes to E.164 with +91 if caller passed local Indian number
function normalizePhone(raw: string) {
  const v = raw.trim();
  if (v.startsWith("+")) return v;
  // strip leading zeros and add +91
  return `+91${v.replace(/^0+/, "")}`;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string) {
  return typeof password === "string" && password.length >= 6;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupPayload;

    // Basic presence checks
    if (
      !body.firstName?.trim() ||
      !body.lastName?.trim() ||
      !body.email?.trim() ||
      !body.phone?.trim() ||
      !body.password
    ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const email = normalizeEmail(body.email);
    const phone = normalizePhone(body.phone);

    // Format validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }
    if (!isValidPassword(body.password)) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (!/^\+?[1-9]\d{7,14}$/.test(phone)) {
      return NextResponse.json({ message: "Invalid phone number format" }, { status: 400 });
    }

    // If you implemented server-side OTP assertions, enforce them here.
    // Example (uncomment if you wired lib/otp as in my previous message):
    // import { assertVerifiedEmail, assertVerifiedPhone } from "@/lib/otp";
    // if (!assertVerifiedEmail(email)) return NextResponse.json({ message: "Email not verified" }, { status: 400 });
    // if (!assertVerifiedPhone(phone)) return NextResponse.json({ message: "Phone not verified" }, { status: 400 });

    // Check if user already exists (by email OR phone)
    const existing: any[] = await executeQuery(
      `SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1`,
      [email, phone]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { message: "User already exists with this email or phone" },
        { status: 409 }
      );
    }

    // Use the same hash as login → bcryptjs
    // If your login uses a specific salt rounds value, keep it consistent here:
    const SALT_ROUNDS = 12;
    const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);

    // Insert new user
    const result: any = await executeQuery(
      `
      INSERT INTO users 
        (first_name, last_name, email, phone, password_hash, email_verified, phone_verified, created_at) 
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [
        body.firstName.trim(),
        body.lastName.trim(),
        email,
        phone,
        passwordHash,
        body.emailVerified ? 1 : 0, // or 1 if you enforced server-side verify above
        body.phoneVerified ? 1 : 0, // or 1 if you enforced server-side verify above
      ]
    );

    return NextResponse.json(
      {
        success: true,
        userId: result?.insertId ?? null,
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
