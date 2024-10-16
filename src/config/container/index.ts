import { container } from "tsyringe";
import { UrlRepository } from "@modules/urls/repositories/implementations/UrlRepository";
import { IUrlRepository } from "@modules/urls/repositories/interfaces/UrlRepository.interface";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@modules/users/repositories/interfaces/UsersRepository.interface";

container.registerSingleton<IUrlRepository>("UrlRepository", UrlRepository);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
