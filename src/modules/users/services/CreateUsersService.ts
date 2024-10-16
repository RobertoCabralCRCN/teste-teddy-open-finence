import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";
import {
  ICreateUsersDTO,
  IUsersRepository,
} from "../repositories/interfaces/UsersRepository.interface";
import { User } from "../entities/User";

@injectable()
export class CreateUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUsersDTO): Promise<User | null> {
    const user = new User();
    Object.assign(user, { ...data });
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Email address already used!", 404);
    }

    const hashedPassword = await hash(data.password, 8);

    const cretedUser = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      created_at: new Date(),
      urls: [],
    });

    return cretedUser;
  }
}
