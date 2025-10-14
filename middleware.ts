// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "maega_session";

// Edge-safe secret
function getSecretKey() {
  const secret = process.env.AUTH_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error("AUTH_SECRET (or JWT_SECRET) is not set");
  return new TextEncoder().encode(secret);
}

// Only protect these routes
export const config = {
  matcher: ["/dashboard/:path*", "/book/:path*"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return redirectToLogin(req);
  }

  try {
    // Verify token on Edge using jose
    await jwtVerify(token, getSecretKey());
    // Token valid -> allow through
    return NextResponse.next();
  } catch {
    // Invalid or expired token
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}
