import ExampleService from "./ExampleService";

import ExampleRepository from "./ExampleRepository";
import { mock } from "jest-mock-extended";

describe("ExampleService", () => {
  describe("getAll", () => {
    const repository = mock<ExampleRepository>();
    repository.getAll.mockResolvedValue([
      { id: 1, name: "example" },
      { id: 2, name: "example" },
    ]);

    it("should return a list of examples", async () => {
      const service = new ExampleService(repository);
      const examples = await service.getAll();
      expect(examples).toEqual([
        { id: 1, name: "example" },
        { id: 2, name: "example" },
      ]);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });
  describe("getById", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const repository = mock<ExampleRepository>();
    repository.getById.mockResolvedValue({ id: 1, name: "example" });

    it("should return an example", async () => {
      const service = new ExampleService(repository);
      const example = await service.getById(1);
      expect(example).toEqual({ id: 1, name: "example" });
      expect(repository.getById).toHaveBeenCalledWith(1);
    });
  });
  describe("create", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const repository = mock<ExampleRepository>();
    repository.create.mockResolvedValue(true);

    it("should return true if example is valid", async () => {
      const service = new ExampleService(repository);
      const result = await service.create({ id: 1, name: "example" });
      expect(result).toBe(true);
      expect(repository.create).toHaveBeenCalledWith({
        id: 1,
        name: "example",
      });
    });
    it("should return false if example is invalid", async () => {
      const service = new ExampleService(repository);
      const result = await service.create({ id: 1, name: "" });
      expect(result).toBe(false);
      expect(repository.create).not.toHaveBeenCalled();
    });
    it("should return false if occurs and error on database", async () => {
      repository.create.mockResolvedValue(false);
      const service = new ExampleService(repository);
      const result = await service.create({ id: 1, name: "example" });
      expect(result).toBe(false);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });
  describe("update", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const repository = mock<ExampleRepository>();
    repository.update.mockResolvedValue(true);

    it("should return true if example is valid", async () => {
      const service = new ExampleService(repository);
      const result = await service.update({ id: 1, name: "example" });
      expect(result).toBe(true);
      expect(repository.update).toHaveBeenCalledWith({
        id: 1,
        name: "example",
      });
    });
    it("should return false if example is invalid", async () => {
      const service = new ExampleService(repository);
      const result = await service.update({ id: 1, name: "" });
      expect(result).toBe(false);
      expect(repository.update).not.toHaveBeenCalled();
    });
    it("should return false if occurs and error on database", async () => {
      repository.update.mockResolvedValue(false);
      const service = new ExampleService(repository);
      const result = await service.update({ id: 1, name: "example" });
      expect(result).toBe(false);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });
  describe("delete", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const repository = mock<ExampleRepository>();
    repository.delete.mockResolvedValue(true);

    it("should return true", async () => {
      const service = new ExampleService(repository);
      const result = await service.delete(1);
      expect(result).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
    it("should return false if occurs and error on database", async () => {
      repository.delete.mockResolvedValue(false);
      const service = new ExampleService(repository);
      const result = await service.delete(1);
      expect(result).toBe(false);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
