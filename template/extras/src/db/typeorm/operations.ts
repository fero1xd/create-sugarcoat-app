import { AppDataSource } from ".";
import { User } from "./schema";

export const getAllUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  return users;
};
