import { NextResponse } from "next/server";

export function adminOnly(user: any) {
  if (user.role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden (Admin Only)" }, { status: 403 });
  }
  return null;
}
