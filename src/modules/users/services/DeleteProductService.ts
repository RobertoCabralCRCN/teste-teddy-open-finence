import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/interfaces/UsersRepository.interface';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const data = await this.usersRepository.findById(id);

    if (!data) {
      throw new AppError('User not already exist!');
    }

    await this.usersRepository.delete(data);

    return;
  }
}
