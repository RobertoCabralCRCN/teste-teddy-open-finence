import "reflect-metadata";
import { UpdateUrlService } from "@modules/urls/services/UpdateUrlService";
import { IUrlRepository } from "@modules/urls/repositories/interfaces/UrlRepository.interface";

describe("UpdateUrlService", () => {
  let urlRepositoryMock: jest.Mocked<IUrlRepository>;
  let sut: UpdateUrlService;

  beforeAll(() => {
    urlRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<IUrlRepository>;

    sut = new UpdateUrlService(urlRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  describe("execute method", () => {
    it("should update the URL and return the updated URL", async () => {
      const mockUrl = {
        id: "url_id",
        originalUrl: "https://original.url",
        shortUrl: "https://short.url",
        userId: "user_id",
        clicks: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateData = {
        id: "url_id",
        originalUrl: "https://new.original.url",
        userId: "user_id",
      };

      urlRepositoryMock.findById.mockResolvedValueOnce(mockUrl);
      urlRepositoryMock.update.mockResolvedValueOnce({
        ...mockUrl,
        originalUrl: updateData.originalUrl,
        updatedAt: new Date(),
      });

      const result = await sut.execute(updateData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty("id", mockUrl.id);
      expect(result).toHaveProperty("originalUrl", updateData.originalUrl);
      expect(urlRepositoryMock.findById).toHaveBeenCalledWith(updateData.id);
      expect(urlRepositoryMock.findById).toHaveBeenCalledTimes(1);
      expect(urlRepositoryMock.update).toHaveBeenCalledWith({
        id: updateData.id,
        originalUrl: updateData.originalUrl,
        userId: updateData.userId,
        shortUrl: expect.any(String),
        clicks: mockUrl.clicks,
        createdAt: mockUrl.createdAt,
        updatedAt: expect.any(Date),
      });
      expect(urlRepositoryMock.update).toHaveBeenCalledTimes(1);
    });
  });
});
