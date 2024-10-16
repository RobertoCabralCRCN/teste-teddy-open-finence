import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import { GetByUrlService } from "@modules/urls/services/GetByUrlService";
import { IUrlRepository } from "@modules/urls/repositories/interfaces/UrlRepository.interface";

describe("GetByUrlService", () => {
  let urlRepositoryMock: jest.Mocked<IUrlRepository>;
  let sut: GetByUrlService;

  beforeAll(() => {
    urlRepositoryMock = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IUrlRepository>;
    sut = new GetByUrlService(urlRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("execute method", () => {
    it("should return the found URL", async () => {
      const mockUrl = {
        id: "some_id",
        userId: "some_user_id",
        originalUrl: "https://original.url",
        shortUrl: "https://short.url",
        clickStats: 10,
        clicks: 5,
        deletedAt: undefined,
      };

      urlRepositoryMock.findById.mockResolvedValueOnce(mockUrl);
      const result = await sut.execute("some_id");

      expect(result).toEqual(mockUrl);
      expect(urlRepositoryMock.findById).toHaveBeenCalledWith("some_id");
      expect(urlRepositoryMock.findById).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the URL does not exist", async () => {
      urlRepositoryMock.findById.mockResolvedValueOnce(null);

      try {
        await sut.execute("non_existing_id");
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
      }

      expect(urlRepositoryMock.findById).toHaveBeenCalledWith(
        "non_existing_id"
      );
      expect(urlRepositoryMock.findById).toHaveBeenCalledTimes(1);
    });
  });
});
