import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserService } from '../services/DeleteProductService';

class DeleteUserController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const deleteUserService = container.resolve(DeleteUserService);

    const deleted = await deleteUserService.execute(id);

    return response.send(deleted);
  }
}

export { DeleteUserController };
