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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = __importDefault(require("../models/book.models"));
const borrow_models_1 = __importDefault(require("../models/borrow.models"));
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield borrow_models_1.default.aggregate(borrowAggregate);
        console.log(data);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
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
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book: borrowBook, quantity, dueDate } = req.body;
    try {
        const book = yield book_models_1.default.findById(borrowBook);
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
            const data = yield borrow_models_1.default.create(newBorrowBook);
            book.copies -= quantity;
            book.save();
            if (book.copies === 0) {
                yield book_models_1.default.findByIdAndUpdate(book._id, { available: false });
            }
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data,
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
}));
