import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';

class CreateSessionsController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;
    const createSessionsService = container.resolve(CreateSessionsService);

    const user = await createSessionsService.execute({
      email,
      password,
    });

    return response.send(user);
  }
}

export { CreateSessionsController };
