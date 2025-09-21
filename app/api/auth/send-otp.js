// pages/api/auth/send-otp.js
import { generateOTP, storeOTP, sendEmailOTP, sendSMSOTP } from '../../../lib/otpUtils.js';
import { executeQuery } from '../../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { identifier, type } = req.body;

  if (!identifier || !type) {
    return res.status(400).json({ message: 'Identifier and type are required' });
  }

  if (!['email', 'phone'].includes(type)) {
    return res.status(400).json({ message: 'Invalid type. Must be email or phone' });
  }

  try {
    // Validate email format
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // Check if email already exists
      const existingEmail = await executeQuery(
        'SELECT id FROM users WHERE email = ?',
        [identifier]
      );
      
      if (existingEmail.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    // Validate phone format (basic validation)
    if (type === 'phone') {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(identifier)) {
        return res.status(400).json({ message: 'Invalid phone format' });
      }
      
      // Check if phone already exists
      const existingPhone = await executeQuery(
        'SELECT id FROM users WHERE phone = ?',
        [identifier]
      );
      
      if (existingPhone.length > 0) {
        return res.status(400).json({ message: 'Phone number already registered' });
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
      return res.status(500).json({ 
        message: `Failed to send ${type} OTP`,
        error: sendResult.error 
      });
    }

    res.status(200).json({ 
      message: `OTP sent successfully to ${identifier}`,
      type 
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}