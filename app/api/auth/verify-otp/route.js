// app/api/auth/verify-otp/route.js
import { NextResponse } from 'next/server';
import { verifyOTP } from '../../../../lib/otpUtils.js';

export async function POST(request) {
  try {
    const { identifier, otpCode, type } = await request.json();

    if (!identifier || !otpCode || !type) {
      return NextResponse.json(
        { message: 'Identifier, OTP code, and type are required' },
        { status: 400 }
      );
    }

    if (!['email', 'phone'].includes(type)) {
      return NextResponse.json(
        { message: 'Invalid type. Must be email or phone' },
        { status: 400 }
      );
    }

    const verificationResult = await verifyOTP(identifier, otpCode, type);

    if (!verificationResult.success) {
      return NextResponse.json(
        { message: verificationResult.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      message: verificationResult.message,
      verified: true 
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}