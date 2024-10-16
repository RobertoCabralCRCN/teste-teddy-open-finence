import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateUserService } from '../services/UpdateUserService';

class UpdateUserController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { name, email, avatar, password } = request.body;
    const updateUserService = container.resolve(UpdateUserService);

    const updatedProduct = await updateUserService.execute({
      id,
      name,
      email,
      avatar,
      password,
    });

    return response.send(updatedProduct);
  }
}

export { UpdateUserController };
