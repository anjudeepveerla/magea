// app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";
import { sendEmailOtp, sendSmsOtp } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const { identifier, type } = await req.json();
    if (!identifier || !type || !["email", "phone"].includes(type)) {
      return NextResponse.json({ message: "identifier and type=email|phone are required" }, { status: 400 });
    }

    if (type === "email") {
      const r = await sendEmailOtp(String(identifier).toLowerCase().trim());
      return NextResponse.json({ success: true, ttl: r.ttl });
    } else {
      const phone = String(identifier).trim();
      const r = await sendSmsOtp(phone.startsWith("+") ? phone : `+91${phone.replace(/^0+/, "")}`);
      return NextResponse.json({ success: true, ttl: r.ttl });
    }
  } catch (err: any) {
    const msg = err?.message || "Failed to send OTP";
    // If we included a retryIn on rate limit, expose it
    const payload: any = { success: false, message: msg };
    if (typeof err?.retryIn === "number") payload.retryIn = err.retryIn;
    return NextResponse.json(payload, { status: 429 });
  }
}
