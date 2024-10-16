import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUrlService } from "../services/DeleteUrlService";
import AppError from "@shared/errors/AppError";

export class DeleteUrlController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const deleteUrlService = container.resolve(DeleteUrlService);

    try {
      await deleteUrlService.execute(id);

      return response.status(204).send();
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
