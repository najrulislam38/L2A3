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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const PORT = 5000;
// dotenv config
dotenv_1.default.config();
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db_url = process.env.MONGODB_URL;
            if (!db_url) {
                throw new Error("DB url is unavailable or undefined");
            }
            yield mongoose_1.default.connect(db_url);
            console.log("connected to mongodb using mongoose.");
            server = app_1.default.listen(PORT, () => {
                console.log(`Server is running on  ${PORT} port`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
