import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

class UpdateUserAvatarController {
  static async handler(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const avatar = request.path
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const created = await updateUserAvatarService.execute({
      user_id: id,
      avatarFilename: avatar,
    });

    return response.send(created);
  }
}

export { UpdateUserAvatarController };
