import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as any;
}

export function getTokenFromRequest(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return verifyToken(auth.split(" ")[1]);
  } catch {
    return null;
  }
}
