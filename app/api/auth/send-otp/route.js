// app/api/auth/send-otp/route.js
import { NextResponse } from 'next/server';
import { generateOTP, storeOTP, sendEmailOTP, sendSMSOTP } from '../../../../lib/otpUtils.js';
import { executeQuery } from '../../../../lib/db.js';

export async function POST(request) {
  try {
    const { identifier, type } = await request.json();

    if (!identifier || !type) {
      return NextResponse.json(
        { message: 'Identifier and type are required' },
        { status: 400 }
      );
    }

    if (!['email', 'phone'].includes(type)) {
      return NextResponse.json(
        { message: 'Invalid type. Must be email or phone' },
        { status: 400 }
      );
    }

    // Validate email format
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        return NextResponse.json(
          { message: 'Invalid email format' },
          { status: 400 }
        );
      }
      
      // Check if email already exists
      const existingEmail = await executeQuery(
        'SELECT id FROM users WHERE email = ?',
        [identifier]
      );
      
      if (existingEmail.length > 0) {
        return NextResponse.json(
          { message: 'Email already registered' },
          { status: 400 }
        );
      }
    }

    // Validate phone format (basic validation)
    if (type === 'phone') {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(identifier)) {
        return NextResponse.json(
          { message: 'Invalid phone format' },
          { status: 400 }
        );
      }
      
      // Check if phone already exists
      const existingPhone = await executeQuery(
        'SELECT id FROM users WHERE phone = ?',
        [identifier]
      );
      
      if (existingPhone.length > 0) {
        return NextResponse.json(
          { message: 'Phone number already registered' },
          { status: 400 }
        );
      }
    }

    // Generate and store OTP
    const otpCode = generateOTP();
    await storeOTP(identifier, otpCode, type);

    // Send OTP
    let sendResult;
    if (type === 'email') {
      sendResult = await sendEmailOTP(identifier, otpCode);
    } else {
      sendResult = await sendSMSOTP(identifier, otpCode);
    }

    if (!sendResult.success) {
      return NextResponse.json(
        { 
          message: `Failed to send ${type} OTP`,
          error: sendResult.error 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: `OTP sent successfully to ${identifier}`,
      type 
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}