// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { buildClearSessionCookie } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(buildClearSessionCookie());
  return res;
}
