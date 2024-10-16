import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListUrlsController } from "@modules/urls/controllers/ListUrlsController";
import { ListUrlsService } from "@modules/urls/services/ListUrlsService";

describe("ListUrlsController", () => {
  let listUrlsController: ListUrlsController;
  let listUrlsServiceMock: jest.Mocked<ListUrlsService>;

  beforeAll(() => {
    listUrlsServiceMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ListUrlsService>;

    container.resolve = jest.fn().mockReturnValue(listUrlsServiceMock);
    listUrlsController = new ListUrlsController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(listUrlsController).toBeDefined();
  });

  describe("handler method", () => {
    it("should return a list of URLs", async () => {
      const req = {
        params: {
          email: "test@example.com",
        },
      } as unknown as Request;

      const mockUrlsList = [
        {
          id: "1",
          originalUrl: "https://original.url/1",
          shortUrl: "https://short.url/1",
          clicks: 2,
        },
        {
          id: "2",
          originalUrl: "https://original.url/2",
          shortUrl: "https://short.url/2",
          clicks: 10,
        },
      ];

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      listUrlsServiceMock.execute.mockResolvedValueOnce(mockUrlsList);

      await ListUrlsController.handler(req, res);

      expect(listUrlsServiceMock.execute).toHaveBeenCalledWith(
        req.params.email
      );
      expect(listUrlsServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockUrlsList);
    });

    it("should return a 500 error on unexpected error", async () => {
      const req = {
        params: {
          email: "test@example.com",
        },
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      listUrlsServiceMock.execute.mockRejectedValueOnce(
        new Error("Unexpected error")
      );

      await ListUrlsController.handler(req, res);

      expect(listUrlsServiceMock.execute).toHaveBeenCalledWith(
        req.params.email
      );
      expect(listUrlsServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
