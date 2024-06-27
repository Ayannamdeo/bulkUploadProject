"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const Controllers_1 = require("./Controllers");
const userValidation_1 = require("../../lib/middlewares/userValidation");
class User_Router_Class {
    //Role based authorization
    constructor() {
        this.router = express_1.default.Router();
        this.userControllers = new Controllers_1.UserControllers();
        this.setupRoutes();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new User_Router_Class();
        }
        return this.instance;
    }
    setupRoutes() {
        this.router.post("/register", userValidation_1.UserValidation.register, this.userControllers.register);
        this.router.post("/login", userValidation_1.UserValidation.login, this.userControllers.login);
        // this.router.get(
        //   "/",
        //   AuthMiddleware.restrictTo(["NORMAL", "ADMIN"]),
        //   (req: Request, res: Response) => {
        //     return res
        //       .status(200)
        //       .json({ message: "Accessible by admins and normal users alike" });
        //   },
        // );
        //
        // this.router.get(
        //   "/admin",
        //   AuthMiddleware.authenticate,
        //   AuthMiddleware.restrictTo(["ADMIN"]),
        //   this.userControllers.getAllUsers,
        // );
        // this.router.delete(
        //   "/admin/:id",
        //   AuthMiddleware.authenticate,
        //   AuthMiddleware.restrictTo(["ADMIN"]),
        //   this.userControllers.deleteUser,
        // );
    }
}
const UserRouter = User_Router_Class.getInstance().router;
exports.UserRouter = UserRouter;
