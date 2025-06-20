import mongoose from "mongoose";
import app from "../../app";
import express, { Request, Response } from "express";
import Books from "../models/book.models";

export const booksRoutes = express.Router();

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
  } catch (error) {}
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
