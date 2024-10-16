import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetByUrlService } from "../services/GetByUrlService";
import AppError from "@shared/errors/AppError";

export class GetByUrlController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const getByUrlService = container.resolve(GetByUrlService);

    try {
      const foundUrl = await getByUrlService.execute(id);

      return response.json(foundUrl);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
