// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { executeQuery } from "@/lib/db";
import {
  signSession,
  buildSessionCookie,
  DEFAULT_MAX_AGE_SECONDS,
} from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Look up user
    const rows = await executeQuery(
      `
      SELECT
        id,
        first_name AS firstName,
        last_name  AS lastName,
        email,
        password_hash AS passwordHash
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = rows[0] as {
      id: number;
      firstName: string | null;
      lastName: string | null;
      email: string;
      passwordHash: string;
    };

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Sign JWT and attach as HttpOnly cookie on the response (no cookies() call here)
    const token = signSession(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      DEFAULT_MAX_AGE_SECONDS
    );

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    res.cookies.set(buildSessionCookie(token, DEFAULT_MAX_AGE_SECONDS));
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
