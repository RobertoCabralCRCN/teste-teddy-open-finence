import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetByUserService } from '../services/GetByProductService';

class GetByUserController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const getByUserService = container.resolve(GetByUserService);

    const finded = await getByUserService.execute(id);

    return response.send(finded);
  }
}

export { GetByUserController };
