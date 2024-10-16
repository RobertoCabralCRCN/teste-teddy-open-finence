import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/interfaces/UsersRepository.interface";
import { User } from "../entities/User";

@injectable()
export class ListUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[] | null> {
    const list = await this.usersRepository.getAll();

    return list;
  }
}
