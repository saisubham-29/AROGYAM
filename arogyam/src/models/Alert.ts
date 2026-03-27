import mongoose, { Schema } from "mongoose";

const AlertSchema = new Schema({
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  type: { type: String, enum: ["critical", "warning", "alert"], required: true },
  message: { type: String, required: true },
  resolved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Alert || mongoose.model("Alert", AlertSchema);
