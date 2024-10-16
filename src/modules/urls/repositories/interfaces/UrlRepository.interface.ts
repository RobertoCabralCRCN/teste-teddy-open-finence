import { Url } from "@modules/urls/entities/Url";
import { IBaseRepository } from "@shared/BaseRepository/BaseRepository.interface";

interface ICreateUrlsDTO {
  originalUrl: string;
  userId: string;
  shortUrl: string;
  clicks: number;
}
interface IUpdateUrlsDTO {
  id?: string;
  originalUrl: string;
  userId: string;
  shortUrl: string;
  clicks: number;
}

interface IUrlRepository extends IBaseRepository<Url> {
  listUrlsByUser(userId: string): Promise<Url[]>;
  findByShortUrl(shortUrl: string): Promise<Url>;
}

export { IUrlRepository, ICreateUrlsDTO, IUpdateUrlsDTO };
