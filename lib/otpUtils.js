// lib/otpUtils.js
import { executeQuery } from './db.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Generate 6-digit OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP in database
export async function storeOTP(identifier, otpCode, type) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await executeQuery(
    'DELETE FROM otp_verifications WHERE identifier = ? AND otp_type = ?',
    [identifier, type]
  );

  await executeQuery(
    `INSERT INTO otp_verifications
      (identifier, otp_code, otp_type, expires_at, attempts, verified)
     VALUES (?, ?, ?, ?, 0, FALSE)`,
    [identifier, otpCode, type, expiresAt]
  );
}

// Verify OTP (attempts increment only on failure; never on success)
export async function verifyOTP(identifier, otpCode, type) {
  const results = await executeQuery(
    `SELECT * FROM otp_verifications
     WHERE identifier = ? AND otp_type = ? AND verified = FALSE
     ORDER BY created_at DESC LIMIT 1`,
    [identifier, type]
  );

  if (results.length === 0) {
    return { success: false, message: 'No OTP found' };
  }

  const otpRecord = results[0];

  if (new Date() > new Date(otpRecord.expires_at)) {
    return { success: false, message: 'OTP has expired' };
  }

  if (otpRecord.attempts >= 3) {
    return { success: false, message: 'Too many attempts. Please request a new OTP' };
  }

  // Mismatch → increment attempts, keep unverified
  if (otpRecord.otp_code !== otpCode) {
    await executeQuery(
      'UPDATE otp_verifications SET attempts = attempts + 1 WHERE id = ?',
      [otpRecord.id]
    );
    return { success: false, message: 'Invalid OTP' };
  }

  // Match → mark verified, do not increment attempts
  await executeQuery(
    'UPDATE otp_verifications SET verified = TRUE WHERE id = ?',
    [otpRecord.id]
  );

  return { success: true, message: 'OTP verified successfully' };
}

// Email configuration
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send OTP via email
export async function sendEmailOTP(email, otpCode) {
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@maega.com',
    to: email,
    subject: 'Your MAEGA Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">MAEGA Email Verification</h2>
        <p>Your verification code is:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${otpCode}</span>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send OTP via SMS
export async function sendSMSOTP(phone, otpCode) {
  try {
    await twilioClient.messages.create({
      body: `Your MAEGA verification code is: ${otpCode}. This code expires in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    return { success: true };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { success: false, error: error.message };
  }
}
