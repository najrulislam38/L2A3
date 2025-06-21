import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controller/books.controller";
import { borrowRoutes } from "./app/controller/borrow.controller";

const app: Application = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the library management server.");
});

export default app;
