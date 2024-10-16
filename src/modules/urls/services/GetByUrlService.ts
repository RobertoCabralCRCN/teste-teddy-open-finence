import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { IUrlRepository } from "../repositories/interfaces/UrlRepository.interface";
import { Url } from "../entities/Url";

@injectable()
export class GetByUrlService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(id: string): Promise<Url | null> {
    const findUrl = await this.urlRepository.findById(id);

    if (!findUrl) {
      throw new AppError("Url not already exists!", 404);
    }

    return findUrl;
  }
}
