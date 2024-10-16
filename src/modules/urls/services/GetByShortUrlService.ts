import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUrlRepository } from "../repositories/interfaces/UrlRepository.interface";
import { Url } from "../entities/Url";

@injectable()
export class GetByShortUrlService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(shortUrl: string): Promise<Url> {
    const findedShort = await this.urlRepository.findByShortUrl(shortUrl);

    if (!findedShort) {
      throw new AppError("Url not already exists!", 404);
    }

    return findedShort;
  }
}
