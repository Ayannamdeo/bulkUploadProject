import { IUser } from "../entities";
import { USER } from "./modelSchema";

class UserRepository {
  getAll = async (): Promise<IUser[] | null> => {
    return await USER.find();
  };

  delete = async (id: number): Promise<any | null> => {
    return await USER.findByIdAndDelete(id);
  };

  create = async (user: IUser): Promise<IUser> => {
    return await USER.create(user);
  };

  getByEmail = async (email: string): Promise<IUser | null> => {
    return await USER.findOne({ email });
  };
}

export { UserRepository };
