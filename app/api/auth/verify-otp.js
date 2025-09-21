// pages/api/auth/verify-otp.js
import { verifyOTP } from '../../../lib/otpUtils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { identifier, otpCode, type } = req.body;

  if (!identifier || !otpCode || !type) {
    return res.status(400).json({ message: 'Identifier, OTP code, and type are required' });
  }

  if (!['email', 'phone'].includes(type)) {
    return res.status(400).json({ message: 'Invalid type. Must be email or phone' });
  }

  try {
    const verificationResult = await verifyOTP(identifier, otpCode, type);

    if (!verificationResult.success) {
      return res.status(400).json({ message: verificationResult.message });
    }

    res.status(200).json({ 
      message: verificationResult.message,
      verified: true 
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}