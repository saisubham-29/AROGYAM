import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id, role: user.role, name: user.name });

  const res = NextResponse.json({ token, role: user.role, name: user.name });
  // Set cookie so middleware can verify on server side
  res.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
