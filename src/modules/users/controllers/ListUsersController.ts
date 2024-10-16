import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersService } from '../services/ListUsersService';

class ListUsersController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const list = await listUsersService.execute();

    return response.send(list);
  }
}

export { ListUsersController };
