import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";

export async function auth(req: Request) {
  const authorization = req.headers.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return { user: null, error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  const token = authorization.replace("Bearer ", "");

  const user = verifyToken(token);

  if (!user) {
    return { user: null, error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
  }

  return { user, error: null };
}
