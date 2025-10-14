// lib/session.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const COOKIE_NAME = "maega_session";
export const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error("AUTH_SECRET (or JWT_SECRET) is not set");
  return secret;
}

export type SessionUser = {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export type SessionPayload = {
  sub: string; // user id as string
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  iat?: number;
  exp?: number;
};

export function signSession(
  user: SessionUser,
  maxAge = DEFAULT_MAX_AGE_SECONDS
): string {
  const payload: SessionPayload = {
    sub: String(user.id),
    email: user.email,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
  };
  return jwt.sign(payload, getSecret(), { expiresIn: maxAge });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, getSecret()) as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Server-side helper to read the session in Server Components/Actions.
 * Note: in Next 14.2+ dynamic APIs must be awaited.
 */
export async function getServerSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

/** Build cookie attributes for setting the session cookie on a NextResponse */
export function buildSessionCookie(
  token: string,
  maxAge = DEFAULT_MAX_AGE_SECONDS
) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/** Build attributes for clearing the session cookie on a NextResponse */
export function buildClearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
