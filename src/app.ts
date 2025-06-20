import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controller/books.controller";

const app: Application = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/books", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the library management server.");
});

export default app;
