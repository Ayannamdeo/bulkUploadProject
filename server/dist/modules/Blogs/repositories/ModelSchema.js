"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" }],
}, { timestamps: true });
const blogModel = mongoose_1.default.model("blog", blogSchema);
exports.blogModel = blogModel;
