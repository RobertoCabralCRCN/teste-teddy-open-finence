import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUrlController } from "@modules/urls/controllers/CreateUrlController";
import { CreateUrlsShortsService } from "@modules/urls/services/CreateUrlsShortsService";
import { Url } from "@modules/urls/entities/Url";

describe("CreateUrlController", () => {
  let createUrlsShortsServiceMock: jest.Mocked<CreateUrlsShortsService>;

  beforeAll(() => {
    createUrlsShortsServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateUrlsShortsService>;

    container.resolve = jest.fn().mockReturnValue(createUrlsShortsServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(CreateUrlController).toBeDefined();
  });

  describe("handler method", () => {
    it("should create a new short URL and return status 201", async () => {
      const req = {
        body: {
          originalUrl: "https://example.com",
          email: "user@example.com",
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockCreatedUrl: Url = {
        id: "1",
        shortUrl: "https://short.url/abc123",
        originalUrl: "https://example.com",
        userId: "123456",
        clicks: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      createUrlsShortsServiceMock.execute.mockResolvedValueOnce(mockCreatedUrl);

      await CreateUrlController.handler(req, res);

      expect(createUrlsShortsServiceMock.execute).toHaveBeenCalledWith(
        req.body.originalUrl,
        req.body.email
      );
      expect(createUrlsShortsServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          shortUrl: mockCreatedUrl.shortUrl,
        })
      );
    });

    it("should return a 400 error if URL creation fails", async () => {
      const req = {
        body: {
          originalUrl: "https://example.com",
          email: "user@example.com",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      createUrlsShortsServiceMock.execute.mockResolvedValueOnce(null);

      await CreateUrlController.handler(req, res);

      expect(createUrlsShortsServiceMock.execute).toHaveBeenCalledWith(
        req.body.originalUrl,
        req.body.email
      );
      expect(createUrlsShortsServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Error creating URL" });
    });
  });
});
