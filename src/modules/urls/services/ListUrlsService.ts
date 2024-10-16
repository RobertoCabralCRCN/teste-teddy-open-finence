import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../repositories/interfaces/UrlRepository.interface";
import { IUsersRepository } from "@modules/users/repositories/interfaces/UsersRepository.interface";
import AppError from "@shared/errors/AppError";

@injectable()
export class ListUrlsService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository,
    @inject("UrlRepository")
    private urlRepository: IUrlRepository
  ) {}

  async execute(
    email: string
  ): Promise<
    { originalUrl: string; shortUrl: string; clicks: number }[] | null
  > {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new AppError("User not found", 404);
    }

    const listUrls = await this.urlRepository.listUrlsByUser(user.id);

    if (!listUrls || listUrls.length === 0) {
      return null;
    }

    const urlsWithDetails = listUrls.map((url) => ({
      userId: url.userId,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
    }));

    return urlsWithDetails;
  }
}
