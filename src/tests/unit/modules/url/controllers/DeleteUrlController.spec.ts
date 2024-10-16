import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";

import AppError from "@shared/errors/AppError";
import { DeleteUrlController } from "@modules/urls/controllers/DeleteUrlController";
import { DeleteUrlService } from "@modules/urls/services/DeleteUrlService";

describe("DeleteUrlController", () => {
  let deleteUrlController: DeleteUrlController;
  let deleteUrlServiceMock: jest.Mocked<DeleteUrlService>;

  beforeAll(() => {
    deleteUrlServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<DeleteUrlService>;

    container.resolve = jest.fn().mockReturnValue(deleteUrlServiceMock);
    deleteUrlController = new DeleteUrlController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(deleteUrlController).toBeDefined();
  });

  describe("handler method", () => {
    it("should delete the URL and return status 204", async () => {
      const req = {
        params: {
          id: "123",
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      deleteUrlServiceMock.execute.mockResolvedValueOnce(undefined);

      await DeleteUrlController.handler(req, res);

      expect(deleteUrlServiceMock.execute).toHaveBeenCalledWith(req.params.id);
      expect(deleteUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledTimes(1);
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

      deleteUrlServiceMock.execute.mockRejectedValueOnce(
        new AppError("URL not found!", 404)
      );

      await DeleteUrlController.handler(req, res);

      expect(deleteUrlServiceMock.execute).toHaveBeenCalledWith(req.params.id);
      expect(deleteUrlServiceMock.execute).toHaveBeenCalledTimes(1);
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

      deleteUrlServiceMock.execute.mockRejectedValueOnce(
        new Error("Unexpected error")
      );

      await DeleteUrlController.handler(req, res);

      expect(deleteUrlServiceMock.execute).toHaveBeenCalledWith(req.params.id);
      expect(deleteUrlServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
