"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controller/books.controller");
const borrow_controller_1 = require("./app/controller/borrow.controller");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// API Routes
app.use("/api/books", books_controller_1.booksRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    var a = 5;
    res.send("Welcome to the library management server.");
});
exports.default = app;
