// lib/auth.js
import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'maega_session';
const DEFAULT_MAX_AGE_DAYS = Number(process.env.SESSION_DAYS || 7);

export function signAuthToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: `${DEFAULT_MAX_AGE_DAYS}d`,
  });
}

export function verifyAuthToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.verify(token, secret);
}

export function cookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  const maxAge = DEFAULT_MAX_AGE_DAYS * 24 * 60 * 60; // seconds
  return {
    name: COOKIE_NAME,
    attributes: {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge,
    },
  };
}

export function clearCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    name: COOKIE_NAME,
    attributes: {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    },
  };
}
