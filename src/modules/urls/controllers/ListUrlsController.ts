import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUrlsService } from "../services/ListUrlsService";
import AppError from "@shared/errors/AppError";

export class ListUrlsController {
  static async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.params;

    const listUrlsService = container.resolve(ListUrlsService);

    try {
      const urls = await listUrlsService.execute(email);
      return response.status(200).json(urls);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
