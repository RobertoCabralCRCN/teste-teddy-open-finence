import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUsersService } from '../services/CreateUsersService';

class CreateUsersController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, avatar } = request.body;
    const createUsersService = container.resolve(CreateUsersService);

    const created = await createUsersService.execute({
      name,
      email,
      password,
      avatar,
    });

    return response.send(created);
  }
}

export { CreateUsersController };
