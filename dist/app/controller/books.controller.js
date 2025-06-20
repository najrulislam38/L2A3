"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = __importDefault(require("../models/book.models"));
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        // console.log(query);
        // const users = await Users.find({}).sort({ firstName: "asc" });
        const data = yield book_models_1.default.find({});
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
}));
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_models_1.default.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
}));
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield book_models_1.default.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
}));
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateBookReq = req.body;
        const data = yield book_models_1.default.findByIdAndUpdate(bookId, updateBookReq, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
}));
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_models_1.default.findOneAndDelete({ _id: bookId });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
}));
