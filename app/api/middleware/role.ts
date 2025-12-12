import { NextResponse } from "next/server";

type MaybeUser = { role?: string } | null | undefined;

export function adminOnly(user: MaybeUser) {
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden (Admin Only)" }, { status: 403 });
  }
  return null;
}
