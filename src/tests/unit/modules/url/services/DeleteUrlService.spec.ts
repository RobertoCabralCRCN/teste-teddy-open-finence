import "reflect-metadata";
import { DeleteUrlService } from "@modules/urls/services/DeleteUrlService";
import { IUrlRepository } from "@modules/urls/repositories/interfaces/UrlRepository.interface";
import { Url } from "@modules/urls/entities/Url";

describe("DeleteUrlService", () => {
  let service: DeleteUrlService;
  let urlRepository: jest.Mocked<IUrlRepository>;

  beforeEach(() => {
    urlRepository = {
      findById: jest.fn() as jest.MockedFunction<IUrlRepository["findById"]>,
      update: jest.fn() as jest.MockedFunction<IUrlRepository["update"]>,
      create: jest.fn(),
      delete: jest.fn(),
      getAll: jest.fn(),
      listUrlsByUser: jest.fn(),
      findByShortUrl: jest.fn(),
    } as jest.Mocked<IUrlRepository>;

    service = new DeleteUrlService(urlRepository);
  });

  it("should delete the URL correctly", async () => {
    const id = "123";
    const url: Url = {
      id,
      deletedAt: undefined,
      clicks: 10,
      originalUrl: "www.localhost.com.br",
      shortUrl: "asfgbfg",
      userId: "123456",
      createdAt: new Date("2024-10-14"),
      updatedAt: new Date("2024-10-14"),
    };

    urlRepository.findById.mockResolvedValue(url);

    await service.execute(id);

    expect(urlRepository.update).toHaveBeenCalledWith({
      ...url,
      deletedAt: expect.any(Date),
    });
  });
});
