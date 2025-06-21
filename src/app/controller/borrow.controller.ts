import mongoose from "mongoose";
import express, { Request, Response } from "express";
import Books from "../models/book.models";
import Borrow from "../models/borrow.models";

export const borrowRoutes = express.Router();

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const borrowAggregate = [
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInformation",
        },
      },
      {
        $unwind: "$bookInformation",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInformation.title",
            isbn: "$bookInformation.isbn",
          },
          totalQuantity: 1,
        },
      },
    ];

    const data = await Borrow.aggregate(borrowAggregate);

    console.log(data);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
});

borrowRoutes.post("/", async (req: Request, res: Response) => {
  const { book: borrowBook, quantity, dueDate } = req.body;

  try {
    const book = await Books.findById(borrowBook);

    if (!book || book.copies < 1) {
      res.status(400).json({
        success: false,
        message: "This book is not available.",
      });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: `Books not enough copies available.`,
      });
      return;
    }

    const newBorrowBook = {
      book: book._id,
      quantity,
      dueDate,
    };

    if (book && book.copies >= quantity) {
      const data = await Borrow.create(newBorrowBook);

      book.copies -= quantity;

      book.save();

      if (book.copies === 0) {
        await Books.findByIdAndUpdate(book._id, { available: false });
      }

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
});
