import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";

const seedPatients = [
  { name: "Arthur Dent", age: 74, room: "402", pid: "p001", initials: "AD", bloodType: "O+", conditions: ["HYPERTENSION", "DIABETES"] },
  { name: "Mary Berry", age: 68, room: "112", pid: "p002", initials: "MB", bloodType: "A+", conditions: ["POST-OP RECOVERY"] },
  { name: "Tricia McMillan", age: 71, room: "305", pid: "p003", initials: "TM", bloodType: "B+", conditions: ["ALLERGY: PENICILLIN"] },
];

export async function GET() {
  await connectDB();
  for (const p of seedPatients) {
    await Patient.updateOne({ pid: p.pid }, p, { upsert: true });
  }
  return NextResponse.json({ message: "Seeded 3 patients" });
}
