import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/interfaces/UsersRepository.interface";
import { User } from "../entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class CreateSessionsService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Incorrect email/password!", 401);
    }

    const providedPassword = data.password;
    const storedPassword = user.password;

    if (!providedPassword || !storedPassword) {
      throw new AppError("Invalid password data!", 400);
    }

    const passwordConfirmed = await compare(providedPassword, storedPassword);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password!", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
