import { User } from "@modules/users/entities/User";
import { IBaseRepository } from "@shared/BaseRepository/BaseRepository.interface";

interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
interface IUpdateUsersDTO {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

interface IUsersRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
}

export { IUsersRepository, ICreateUsersDTO, IUpdateUsersDTO };
