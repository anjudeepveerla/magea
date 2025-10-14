// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const user = {
    id: Number(session.sub),
    email: session.email,
    firstName: session.firstName ?? null,
    lastName: session.lastName ?? null,
  };

  return NextResponse.json({ user }, { status: 200 });
}
