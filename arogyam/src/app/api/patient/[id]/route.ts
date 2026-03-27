import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Health from "@/models/Health";
import { getTokenFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = getTokenFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const records = await Health.find({ patientId: id }).sort({ createdAt: -1 });
  return NextResponse.json(records);
}
