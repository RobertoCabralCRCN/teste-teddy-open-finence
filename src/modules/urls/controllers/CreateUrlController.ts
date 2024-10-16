import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUrlsShortsService } from "../services/CreateUrlsShortsService";

export class CreateUrlController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { originalUrl } = request.body;

    console.log("request", request.body);
    const createUrlsShortsService = container.resolve(CreateUrlsShortsService);

    const createdUrl = await createUrlsShortsService.execute({
      originalUrl: originalUrl,
      userId: "",
      shortUrl: "",
      clicks: 0,
    });

    console.log("createdUrl", createdUrl);
    return response.status(201).json(createdUrl);
  }
}
