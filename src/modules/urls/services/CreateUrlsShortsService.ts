import { inject, injectable } from "tsyringe";
import { Url } from "../entities/Url";
import {
  ICreateUrlsDTO,
  IUrlRepository,
} from "../repositories/interfaces/UrlRepository.interface";
import { randomBytes } from "crypto";
import { IUsersRepository } from "@modules/users/repositories/interfaces/UsersRepository.interface";
import AppError from "@shared/errors/AppError";

@injectable()
export class CreateUrlsShortsService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository,
    @inject("UserRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUrlsDTO): Promise<Url> {
    const shortUrl = randomBytes(3).toString("base64").replace(/\W/g, "");

    const newUrl = await this.urlRepository.create({
      userId: data.userId || "",
      originalUrl: data.originalUrl,
      shortUrl,
      clicks: 0,
    });

    if (!newUrl) {
      throw new AppError("Error creating URL", 400);
    }

    return newUrl;
  }
}
