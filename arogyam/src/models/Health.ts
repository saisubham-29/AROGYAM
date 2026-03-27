import mongoose, { Schema } from "mongoose";

const HealthSchema = new Schema({
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  heartRate: { type: Number, required: true },
  oxygenLevel: { type: Number, required: true },
  systolic: { type: Number, required: true },  // blood pressure
  diastolic: { type: Number, required: true },
  recordedBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Health || mongoose.model("Health", HealthSchema);
