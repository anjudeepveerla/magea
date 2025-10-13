import type { NextApiRequest, NextApiResponse } from 'next';
import { verifySessionToken } from '@/lib/session';

interface VerifyResponse {
  success: boolean;
  message: string;
  user?: {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required',
      });
    }

    // Verify the token
    const sessionData = verifySessionToken(token);

    if (!sessionData) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: {
        userId: sessionData.userId,
        email: sessionData.email,
        firstName: sessionData.firstName,
        lastName: sessionData.lastName,
      },
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}