
import mongoose, { models, Schema } from "mongoose";



import { IUser } from "../interfaces/User";

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, unique: true },
    name: { type: String, required: true },
    // phone: { type: Number, unique: false },
    email: { type: String,  unique: true ,},
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", UserSchema);
