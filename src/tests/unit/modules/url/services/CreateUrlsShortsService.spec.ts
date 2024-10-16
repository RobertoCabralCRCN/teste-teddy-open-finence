import "reflect-metadata";
import { UrlRepository } from "@modules/urls/repositories/implementations/UrlRepository";
import { CreateUrlsShortsService } from "@modules/urls/services/CreateUrlsShortsService";
import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository";

describe("CreateUrlsShortsService", () => {
  let service: CreateUrlsShortsService;
  let userRepository: UsersRepository;
  let urlRepository: UrlRepository;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as unknown as UsersRepository;

    urlRepository = {
      create: jest.fn(),
    } as unknown as UrlRepository;

    service = new CreateUrlsShortsService(urlRepository, userRepository);
  });

  it("should create a new shortened URL", async () => {
    const originalUrl = "http://example.com";
    const email = "user@example.com";
    const user = { id: "user-id" };

    userRepository.findByEmail = jest.fn().mockResolvedValue(user);
    urlRepository.create = jest.fn().mockResolvedValue({
      originalUrl,
      shortUrl: "abc123",
      userId: user.id,
      clicks: 0,
    });

    const result = await service.execute(originalUrl, email);

    expect(result).toEqual({
      originalUrl,
      shortUrl: "abc123",
      userId: user.id,
      clicks: 0,
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(urlRepository.create).toHaveBeenCalledWith({
      originalUrl,
      shortUrl: expect.any(String),
      userId: user.id,
      clicks: 0,
    });
  });
});
