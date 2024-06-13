"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_1 = require("../modules");
const router = express_1.default.Router();
router.get("/health", (req, res) => {
    res.status(200).json({ message: "Health Check Passed" });
});
router.use("/api/users", modules_1.UserRouter);
router.use("/api/financials", modules_1.FinancialsRouter);
exports.default = router;
