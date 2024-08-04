import mongoose from "mongoose";
import { Schema } from "mongoose";

const AccountSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balanace: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Account = mongoose.model("Account", AccountSchema);
