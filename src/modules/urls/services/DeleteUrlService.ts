import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../repositories/interfaces/UrlRepository.interface";

@injectable()
export class DeleteUrlService {
  constructor(
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(id: string): Promise<void> {
    const url = await this.urlRepository.findById(id);

    if (!url) {
      throw new AppError("Url not already exists!");
    }

    if (url.deletedAt) {
      throw new AppError("Url has already been deleted!");
    }

    await this.urlRepository.update({
      ...url,
      deletedAt: new Date(),
    });
  }
}
