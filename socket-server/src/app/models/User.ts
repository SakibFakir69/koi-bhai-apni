import mongoose, { models, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, unique: true },
    name: { type: String, required: true },
    phone: { type: Number, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", UserSchema);
