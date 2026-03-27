import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, password, role, patientId } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role, patientId: patientId || null });

  const token = signToken({ id: user._id, role: user.role, name: user.name, patientId: user.patientId });

  const res = NextResponse.json({ token, role: user.role, name: user.name, patientId: user.patientId }, { status: 201 });
  res.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
