import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["care_manager", "parent", "child"], required: true },
  patientId: { type: String, default: null }, // pid of linked patient (for parent/child)
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
