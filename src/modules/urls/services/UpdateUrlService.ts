import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../repositories/interfaces/UrlRepository.interface";
import { Url } from "../entities/Url";
import { randomBytes } from "crypto";

@injectable()
export class UpdateUrlService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(data: any): Promise<Url | null> {
    const urlExists = await this.urlRepository.findById(data.id);

    if (!urlExists) {
      throw new AppError("Url not already exists!");
    }

    const shortUrl = randomBytes(3).toString("base64").replace(/\W/g, "");

    const updatedUrl = await this.urlRepository.update({
      id: data.id,
      originalUrl: data.originalUrl,
      userId: data.userId,
      shortUrl: shortUrl,
      clicks: urlExists.clicks,
      createdAt: urlExists.createdAt,
      updatedAt: new Date(),
    });

    return updatedUrl;
  }
}
