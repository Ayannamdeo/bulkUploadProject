import { Request, Response } from "express";
import { UserServices } from "./Services";
import { IUser, IUserLogin } from "./entities";
import { serverConfig } from "../../config";
import { logger } from "../../lib/helpers/logger";

class UserControllers {
  private readonly userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser: IUser = req.body;

      const existingUser: IUser | null = await this.userServices.getUserByEmail(
        newUser.email,
      );
      if (existingUser) {
        res
          .status(401)
          .json({ message: "This user already exists, kindly Login" });
        return;
      }

      const result = await this.userServices.registerUser(newUser);
      res.status(201).json(result);
      logger.info("result", result);
    } catch (error: any) {
      logger.error("error occured while registering", error);
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: IUserLogin = req.body;
      // console.log(req.body);

      const existingUser: IUser | null = await this.userServices.getUserByEmail(
        user.email,
      );
      if (!existingUser) {
        res.status(404).json({ message: "No user found for current Email" });
        return;
      }
      // correct password check now
      const comparePassword: Boolean = await UserServices.verifyPassword(
        user,
        existingUser!,
      );
      if (!comparePassword) {
        res.status(401).json({ message: "Invalid Credentials" });
        return;
      }

      const token: string = UserServices.generateToken(
        existingUser!,
        serverConfig.jwtSecret,
      );
      logger.debug("token", token);
      // res.cookie("JWT_Token", token);
      // res.status(200).send("CHECKPOINT");
      res.status(200).json({
        token: token,
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser._id,
        // expiresIn: 15,
      });
    } catch (error: any) {
      logger.error("error occurrd while loggin in:", error);
      res
        .status(500)
        .json({ error: error.message, message: "Error while logging in..." });
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const userList = await this.userServices.getAllUsers();
      logger.info("userLists: ", userList);
      if (!userList) {
        logger.warn("NO Users found");
        res.status(404).json({ message: "NO Users found" });
        return;
      }
      res.status(200).json(userList);
    } catch (error: any) {
      logger.error("error while getting all users", error);
      res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const deletedUser = await this.userServices.deleteUser(
        Number(req.params.id),
      );
      logger.info("deletedUser:", deletedUser);
      if (!deletedUser) {
        res.status(404).json({ message: "None User with this id found" });
        return;
      }
      res.status(200).json(deletedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export { UserControllers };
