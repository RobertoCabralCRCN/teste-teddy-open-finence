import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/interfaces/UsersRepository.interface";
import { User } from "../entities/User";
import path from "path";
import uploadConfig from "@config/upload";
import fs from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequest): Promise<User | null> {
    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = data.avatarFilename;

    await this.usersRepository.update(user);

    return user;
  }
}
