import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import {
  IUpdateUsersDTO,
  IUsersRepository,
} from "../repositories/interfaces/UsersRepository.interface";
import { User } from "../entities/User";

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IUpdateUsersDTO): Promise<User | null> {
    const userExists = await this.usersRepository.findById(data.id);

    if (!userExists) {
      throw new AppError("User not already exist!");
    }

    const verifyEmail = await this.usersRepository.findByEmail(data.email);

    const updatedUser = await this.usersRepository.update({
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
    });

    if (updatedUser === verifyEmail) {
      throw new AppError("Email address already used!");
    }

    Object.assign(data, {
      ...updatedUser,
    });

    return updatedUser;
  }
}
