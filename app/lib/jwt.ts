import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

export type JWTPayload = {
  sub: number;
  email: string;
  name: string;
  role: string; // ADMIN / USER
};

export function signToken(payload: JWTPayload) {
  // TANPA expiresIn
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as JWTPayload;
  } catch {
    return null;
  }
}
