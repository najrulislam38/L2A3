import mongoose, { Schema } from "mongoose";
import { IBook } from "../interface/books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true },
    available: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Books.updateMany({ bookId: doc._id }, { $set: { bookId: null } });
  }
});

const Books = mongoose.model<IBook>("Books", bookSchema);

export default Books;
