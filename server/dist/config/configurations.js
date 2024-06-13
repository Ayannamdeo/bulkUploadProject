"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serverConfig = Object.freeze({
    devmode: (_a = process.env.DEV_MODE) !== null && _a !== void 0 ? _a : "development",
    port: parseInt((_b = process.env.PORT) !== null && _b !== void 0 ? _b : "8080", 10),
    jwtSecret: (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : "",
    mongoUrl: (_d = process.env.MONGO_URL) !== null && _d !== void 0 ? _d : "",
});
exports.serverConfig = serverConfig;
