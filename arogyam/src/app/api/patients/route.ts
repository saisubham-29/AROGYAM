import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";
import { getTokenFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const patients = await Patient.find({}).sort({ createdAt: 1 });
  return NextResponse.json(patients);
}

export async function POST(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user || user.role !== "care_manager")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const body = await req.json();
  const patient = await Patient.create(body);
  return NextResponse.json(patient, { status: 201 });
}
