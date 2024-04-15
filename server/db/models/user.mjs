import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  interests: {
    type: [String],
    default: [],
  },
});

export const User = model("User", userSchema);
