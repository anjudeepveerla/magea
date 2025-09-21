// pages/api/auth/signup.js
import bcrypt from 'bcryptjs';
import { executeQuery } from '../../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    password, 
    confirmPassword,
    emailVerified,
    phoneVerified 
  } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Check if both email and phone are verified
  if (!emailVerified || !phoneVerified) {
    return res.status(400).json({ message: 'Both email and phone must be verified before signup' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if user already exists
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE email = ? OR phone = ?',
      [email, phone]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User with this email or phone already exists' });
    }

    // Verify that OTP verification was completed for both email and phone
    const emailVerification = await executeQuery(
      'SELECT verified FROM otp_verifications WHERE identifier = ? AND otp_type = ? AND verified = TRUE ORDER BY created_at DESC LIMIT 1',
      [email, 'email']
    );

    const phoneVerification = await executeQuery(
      'SELECT verified FROM otp_verifications WHERE identifier = ? AND otp_type = ? AND verified = TRUE ORDER BY created_at DESC LIMIT 1',
      [phone, 'phone']
    );

    if (emailVerification.length === 0) {
      return res.status(400).json({ message: 'Email verification not completed' });
    }

    if (phoneVerification.length === 0) {
      return res.status(400).json({ message: 'Phone verification not completed' });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const result = await executeQuery(
      `INSERT INTO users (first_name, last_name, email, phone, password_hash, email_verified, phone_verified) 
       VALUES (?, ?, ?, ?, ?, TRUE, TRUE)`,
      [firstName, lastName, email, phone, passwordHash]
    );

    // Clean up OTP verifications for this user
    await executeQuery(
      'DELETE FROM otp_verifications WHERE identifier IN (?, ?)',
      [email, phone]
    );

    res.status(201).json({ 
      message: 'User created successfully',
      userId: result.insertId,
      user: {
        id: result.insertId,
        firstName,
        lastName,
        email,
        phone,
        emailVerified: true,
        phoneVerified: true
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'User with this email or phone already exists' });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
}