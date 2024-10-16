import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateUrlService } from "../services/UpdateUrlService";
import AppError from "@shared/errors/AppError";

export class UpdateUrlController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const { originalUrl } = request.body;

    const updateUrlService = container.resolve(UpdateUrlService);

    try {
      const updatedUrl = await updateUrlService.execute({
        id,
        originalUrl,
        userId: "",
      });

      return response.json(updatedUrl);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
