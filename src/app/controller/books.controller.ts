import mongoose from "mongoose";
import app from "../../app";
import express, { Request, Response } from "express";
import Books from "../models/book.models";

export const booksRoutes = express.Router();

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const filterData: any = {};
    if (filter) {
      filterData.genre = filter;
    }

    const sortData: any = {};
    if (sortBy) {
      sortData[sortBy as string] = sort;
    }

    const limitation = parseInt(limit as string) || 5;
    console.log(filterData, sortData, limitation);

    const data = await Books.find(filterData).sort(sortData).limit(limitation);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
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

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const data = await Books.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
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

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const data = await Books.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
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

booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateBookReq = req.body;

    const data = await Books.findByIdAndUpdate(bookId, updateBookReq, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
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

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const data = await Books.findOneAndDelete({ _id: bookId }, {});

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
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
