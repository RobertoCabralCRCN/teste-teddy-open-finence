import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";

import AppError from "@shared/errors/AppError";
import { GetByUrlController } from "@modules/urls/controllers/GetByUrlController";
import { GetByUrlService } from "@modules/urls/services/GetByUrlService";

describe("GetByUrlController", () => {
  let getByUrlController: GetByUrlController;
  let getByUrlServiceMock: jest.Mocked<GetByUrlService>;

  beforeAll(() => {
    getByUrlServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetByUrlService>;

    container.resolve = jest.fn().mockReturnValue(getByUrlServiceMock);
    getByUrlController = new GetByUrlController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(getByUrlController).toBeDefined();
  });

  describe("handler method", () => {
    it("should return the found URL", async () => {
      const req = {
        params: {
          id: "123",
        },
      } as unknown as Request;

      const mockUrl = {
        id: "123",
        originalUrl: "https://original.url/123",
        shortUrl: "https://short.url/123",
        clicks: 10,
        userId: "123456",
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      getByUrlServiceMock.execute.mockResolvedValueOnce(mockUrl);

      await GetByUrlController.handler(req, res);

      expect(getByUrlServiceMock.execute).toHaveBeenCalledWith(req.params.id);
      expect(getByUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockUrl);
    });

    it("should return a 404 error if URL is not found", async () => {
      const req = {
        params: {
          id: "123",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      getByUrlServiceMock.execute.mockRejectedValueOnce(
        new AppError("URL not found!", 404)
      );

      await GetByUrlController.handler(req, res);

      expect(getByUrlServiceMock.execute).toHaveBeenCalledWith(req.params.id);
      expect(getByUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "URL not found!" });
    });

    it("should return a 500 error on unexpected error", async () => {
      const req = {
        params: {
          id: "123",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      getByUrlServiceMock.execute.mockRejectedValueOnce(
        new Error("Unexpected error")
      );

      await GetByUrlController.handler(req, res);

      expect(getByUrlServiceMock.execute).toHaveBeenCalledWith(req.params.id);
      expect(getByUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
