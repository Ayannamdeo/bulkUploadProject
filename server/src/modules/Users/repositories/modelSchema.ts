import mongoose from "mongoose";
import { IUser } from "../entities";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "NORMAL" },
  },
  { timestamps: true },
);

const USER: mongoose.Model<IUser> = mongoose.model<IUser>("user", userSchema);

export { USER };

