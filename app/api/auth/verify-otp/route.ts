// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { verifyEmailOtp, verifySmsOtp } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const { identifier, otpCode, type } = await req.json();
    if (!identifier || !otpCode || !type || !["email", "phone"].includes(type)) {
      return NextResponse.json({ message: "identifier, otpCode, and type=email|phone are required" }, { status: 400 });
    }

    if (type === "email") {
      const result = verifyEmailOtp(String(identifier).toLowerCase().trim(), String(otpCode));
      if (!result.ok) {
        return NextResponse.json({ success: false, message: result.message || "Verification failed" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    } else {
      const phone = String(identifier).trim().startsWith("+")
        ? String(identifier).trim()
        : `+91${String(identifier).trim().replace(/^0+/, "")}`;
      const result = await verifySmsOtp(phone, String(otpCode));
      if (!result.ok) {
        return NextResponse.json({ success: false, message: result.message || "Verification failed" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }
  } catch (err: any) {
    const msg = err?.message || "Verification failed";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
