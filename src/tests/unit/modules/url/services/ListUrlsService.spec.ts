import "reflect-metadata";
import { ListUrlsService } from "@modules/urls/services/ListUrlsService";
import { IUrlRepository } from "@modules/urls/repositories/interfaces/UrlRepository.interface";
import { IUsersRepository } from "@modules/users/repositories/interfaces/UsersRepository.interface";

describe("ListUrlsService", () => {
  let userRepositoryMock: jest.Mocked<IUsersRepository>;
  let urlRepositoryMock: jest.Mocked<IUrlRepository>;
  let sut: ListUrlsService;

  beforeAll(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUsersRepository>;

    urlRepositoryMock = {
      listUrlsByUser: jest.fn(),
    } as unknown as jest.Mocked<IUrlRepository>;

    sut = new ListUrlsService(userRepositoryMock, urlRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("execute method", () => {
    it("should return the list of URLs for the existing user", async () => {
      const mockUser = { id: "user_id", email: "user@example.com" };
      const mockUrls = [
        {
          userId: "user_id",
          originalUrl: "https://original.url/1",
          shortUrl: "https://short.url/1",
          clicks: 5,
        },
        {
          userId: "user_id",
          originalUrl: "https://original.url/2",
          shortUrl: "https://short.url/2",
          clicks: 10,
        },
      ];

      userRepositoryMock.findByEmail.mockResolvedValueOnce(mockUser);
      urlRepositoryMock.listUrlsByUser.mockResolvedValueOnce(mockUrls);

      const result = await sut.execute("user@example.com");

      expect(result).toEqual(mockUrls);
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        "user@example.com"
      );
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(urlRepositoryMock.listUrlsByUser).toHaveBeenCalledWith("user_id");
      expect(urlRepositoryMock.listUrlsByUser).toHaveBeenCalledTimes(1);
    });

    it("should return null if the user exists but has no URLs", async () => {
      const mockUser = { id: "user_id", email: "user@example.com" };

      userRepositoryMock.findByEmail.mockResolvedValueOnce(mockUser);
      urlRepositoryMock.listUrlsByUser.mockResolvedValueOnce([]);

      const result = await sut.execute("user@example.com");

      expect(result).toBeNull();
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        "user@example.com"
      );
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(urlRepositoryMock.listUrlsByUser).toHaveBeenCalledWith("user_id");
      expect(urlRepositoryMock.listUrlsByUser).toHaveBeenCalledTimes(1);
    });
  });
});
