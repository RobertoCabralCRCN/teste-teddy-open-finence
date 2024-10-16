import { Url } from "@modules/urls/entities/Url";

describe("Url Entity", () => {
  it("should create a new URL with a unique UUID", () => {
    const url = new Url();
    expect(url.id).toBeDefined();
    expect(url.id).toMatch(
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/
    );
  });

  it("should allow updating of updatedAt", () => {
    const url = new Url();
    const previousUpdatedAt = url.updatedAt;

    url.updatedAt = new Date();

    expect(url.updatedAt).not.toEqual(previousUpdatedAt);
  });

  it("should allow logical deletion through deletedAt", () => {
    const url = new Url();
    expect(url.deletedAt).toBeUndefined();

    url.deletedAt = new Date();

    expect(url.deletedAt).toBeDefined();
  });
});
