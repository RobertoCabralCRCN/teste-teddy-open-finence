import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/interfaces/UsersRepository.interface";
import { User } from "../entities/User";

@injectable()
export class GetByUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User | null> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new AppError("User not already exists!", 404);
    }

    return findUser;
  }
}
