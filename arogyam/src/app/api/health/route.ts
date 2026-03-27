import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Health from "@/models/Health";
import Alert from "@/models/Alert";
import { getTokenFromRequest } from "@/lib/auth";
import { generateAlerts } from "@/lib/alertLogic";

export async function GET(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");
  const query = patientId ? { patientId } : {};
  const records = await Health.find(query).sort({ createdAt: -1 }).limit(100);
  return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
  const user = getTokenFromRequest(req);
  if (!user || user.role !== "care_manager")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const body = await req.json();
  const record = await Health.create({ ...body, recordedBy: user.id });

  const alerts = generateAlerts(body);
  for (const alert of alerts) {
    await Alert.create({ patientId: body.patientId, patientName: body.patientName, ...alert });
  }

  return NextResponse.json({ record, alertsGenerated: alerts.length }, { status: 201 });
}
