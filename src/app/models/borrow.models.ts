import mongoose, { Schema, Types } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new mongoose.Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Books", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
