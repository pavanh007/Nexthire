import mongoose from "mongoose";

const { Schema, model } = mongoose;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true,
    unique: true
  },
});

export const OTP = model("OTP", otpSchema);
