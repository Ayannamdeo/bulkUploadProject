"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crudSchema = new mongoose_1.default.Schema({
    _id: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
}, { timestamps: true });
const crudModel = mongoose_1.default.model("crud", crudSchema);
exports.crudModel = crudModel;
