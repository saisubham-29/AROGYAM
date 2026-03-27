import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alert from "@/models/Alert";
import { getTokenFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const alerts = await Alert.find({ resolved: false }).sort({ createdAt: -1 });
  return NextResponse.json(alerts);
}

export async function PATCH(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await req.json();
  const alert = await Alert.findByIdAndUpdate(id, { resolved: true }, { new: true });
  return NextResponse.json(alert);
}
