import express, { Request, Response, Router } from "express";
import { UserControllers } from "./Controllers";
import { UserValidation } from "../../lib/middlewares/userValidation";
import { AuthMiddleware } from "../../lib/middlewares/authMiddleware";

class User_Router_Class {
  private static instance: User_Router_Class;
  router: Router;
  private readonly userControllers: UserControllers;
  //Role based authorization

  private constructor() {
    this.router = express.Router();
    this.userControllers = new UserControllers();
    this.setupRoutes();
  }

  static getInstance(): User_Router_Class {
    if (!this.instance) {
      this.instance = new User_Router_Class();
    }
    return this.instance;
  }

  private setupRoutes(): void {
    this.router.post(
      "/register",
      UserValidation.register,
      this.userControllers.register,
    );
    this.router.post(
      "/login",
      UserValidation.login,
      this.userControllers.login,
    );

    this.router.get(
      "/",
      AuthMiddleware.restrictTo(["NORMAL", "ADMIN"]),
      (req: Request, res: Response) => {
        return res
          .status(200)
          .json({ message: "Accessible by admins and normal users alike" });
      },
    );

    this.router.get(
      "/admin",
      AuthMiddleware.authenticate,
      AuthMiddleware.restrictTo(["ADMIN"]),
      this.userControllers.getAllUsers,
    );
    this.router.delete(
      "/admin/:id",
      AuthMiddleware.authenticate,
      AuthMiddleware.restrictTo(["ADMIN"]),
      this.userControllers.deleteUser,
    );
  }
}

const UserRouter = User_Router_Class.getInstance().router;

export { UserRouter };
