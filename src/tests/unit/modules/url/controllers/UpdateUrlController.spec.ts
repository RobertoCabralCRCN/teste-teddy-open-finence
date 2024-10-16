import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import { UpdateUrlController } from "@modules/urls/controllers/UpdateUrlController";
import { UpdateUrlService } from "@modules/urls/services/UpdateUrlService";

describe("UpdateUrlController", () => {
  let updateUrlController: UpdateUrlController;
  let updateUrlServiceMock: jest.Mocked<UpdateUrlService>;

  beforeAll(() => {
    updateUrlServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateUrlService>;

    container.resolve = jest.fn().mockReturnValue(updateUrlServiceMock);
    updateUrlController = new UpdateUrlController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(updateUrlController).toBeDefined();
  });

  describe("handler method", () => {
    it("should update the URL and return the updated URL", async () => {
      const req = {
        params: {
          id: "url_id",
        },
        body: {
          originalUrl: "https://new.original.url",
        },
      } as unknown as Request;

      const mockUpdatedUrl = {
        id: "url_id",
        originalUrl: "https://new.original.url",
        shortUrl: "https://short.url",
        userId: "user_id",
        clicks: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      updateUrlServiceMock.execute.mockResolvedValueOnce(mockUpdatedUrl);

      await UpdateUrlController.handler(req, res);

      expect(updateUrlServiceMock.execute).toHaveBeenCalledWith({
        id: req.params.id,
        originalUrl: req.body.originalUrl,
        userId: "",
      });
      expect(updateUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedUrl);
    });

    it("should return a 404 error if URL does not exist", async () => {
      const req = {
        params: {
          id: "url_id",
        },
        body: {
          originalUrl: "https://new.original.url",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      updateUrlServiceMock.execute.mockRejectedValueOnce(
        new AppError("Url not already exists!", 404)
      );

      await UpdateUrlController.handler(req, res);

      expect(updateUrlServiceMock.execute).toHaveBeenCalledWith({
        id: req.params.id,
        originalUrl: req.body.originalUrl,
        userId: "",
      });
      expect(updateUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Url not already exists!",
      });
    });

    it("should return a 500 error on unexpected error", async () => {
      const req = {
        params: {
          id: "url_id",
        },
        body: {
          originalUrl: "https://new.original.url",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      updateUrlServiceMock.execute.mockRejectedValueOnce(
        new Error("Unexpected error")
      );

      await UpdateUrlController.handler(req, res);

      expect(updateUrlServiceMock.execute).toHaveBeenCalledWith({
        id: req.params.id,
        originalUrl: req.body.originalUrl,
        userId: "",
      });
      expect(updateUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
