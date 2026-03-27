import mongoose, { Schema } from "mongoose";

const PatientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  room: { type: String, required: true },
  pid: { type: String, required: true, unique: true },
  initials: { type: String, required: true },
  bloodType: { type: String, default: "Unknown" },
  conditions: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
