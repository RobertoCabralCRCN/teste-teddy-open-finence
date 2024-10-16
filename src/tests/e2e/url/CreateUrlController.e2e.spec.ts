import app from "@shared/http/server";
import request from "supertest";
import { container } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/interfaces/UsersRepository.interface";
import { Url } from "@modules/urls/entities/Url";
import { IUrlRepository } from "@modules/urls/repositories/interfaces/UrlRepository.interface";

describe("CreateUrlController e2e", () => {
  const mockUrlRepository = {
    create: jest.fn().mockImplementation((data: any) => {
      return Promise.resolve(new Url());
    }),
    listUrlsByUser: jest.fn().mockResolvedValue([]),
    findByShortUrl: jest.fn().mockResolvedValue(null),
    getAll: jest.fn().mockResolvedValue([]),
    delete: jest.fn().mockResolvedValue(true),
    findById: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(true),
  };

  const mockUsersRepository = {
    findByEmail: jest.fn().mockImplementation((email: string) => {
      if (email === "test@example.com") {
        return Promise.resolve({ id: "valid-user-id", email });
      }
      return Promise.resolve(null);
    }),
    findByName: jest.fn().mockResolvedValue(null),
    getAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue(true),
    findById: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(true),
  };

  beforeAll(() => {
    container.registerInstance<IUrlRepository>(
      "UrlRepository",
      mockUrlRepository
    );
    container.registerInstance<IUsersRepository>(
      "UserRepository",
      mockUsersRepository
    );
  });

  it("should create a new short URL and return status 201", async () => {
    mockUrlRepository.create.mockImplementationOnce(async (data: any) => {
      const createdUrl = new Url();
      createdUrl.shortUrl = "http://short.url/abc123";
      return createdUrl;
    });

    const response = await request(app)
      .post("/url/")
      .send({ originalUrl: "http://example.com", email: "test@example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("shortUrl");
    expect(response.body.shortUrl).toBe("http://short.url/abc123");
  });

  it("should return a 400 error if original URL or email is not provided", async () => {
    const response = await request(app)
      .post("/url")
      .send({ originalUrl: "", email: "test@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Original URL and email are required"
    );
  });
});
