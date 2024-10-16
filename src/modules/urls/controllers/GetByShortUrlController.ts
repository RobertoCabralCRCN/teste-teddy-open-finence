import { Request, Response } from "express";
import { container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { GetByShortUrlService } from "../services/GetByShortUrlService";

export class GetByShortUrlController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { shortUrl } = request.body;

    const getByShortUrlService = container.resolve(GetByShortUrlService);

    try {
      const findedShort = await getByShortUrlService.execute(shortUrl);

      return response.json(findedShort);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
