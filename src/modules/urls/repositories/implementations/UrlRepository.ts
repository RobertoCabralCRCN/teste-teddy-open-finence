import { BaseRepository } from "@shared/BaseRepository/BaseRepository";
import { IUrlRepository } from "../interfaces/UrlRepository.interface";
import { Url } from "@modules/urls/entities/Url";

class UrlRepository extends BaseRepository<Url> implements IUrlRepository {
  constructor() {
    super(Url, "id");
  }

  async listUrlsByUser(userId: string): Promise<Url[]> {
    const list = await this.getAll();

    return list;
  }

  async findByShortUrl(shortUrl: string): Promise<Url | any> {
    const url = await this.repository.findOne({ where: { shortUrl } });
    return url;
  }
}

export { UrlRepository };
