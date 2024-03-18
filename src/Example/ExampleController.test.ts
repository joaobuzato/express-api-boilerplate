import ExampleController from "./ExampleController";
import ExampleService from "./ExampleService";

describe("ExampleController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll", async () => {
    const getAllSpy = jest.spyOn(ExampleService.prototype, "getAll");
    const controller = new ExampleController();
    getAllSpy.mockResolvedValue([
      { id: 1, name: "example1" },
      { id: 2, name: "example2" },
      { id: 3, name: "example3" },
    ]);

    const examples = await controller.getAll();

    expect(examples).toEqual([
      { id: 1, name: "example1" },
      { id: 2, name: "example2" },
      { id: 3, name: "example3" },
    ]);
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });
  test("getById", async () => {
    const getByIdSpy = jest.spyOn(ExampleService.prototype, "getById");
    const controller = new ExampleController();
    getByIdSpy.mockResolvedValue({ id: 1, name: "example1" });

    const example = await controller.getById(1);

    expect(example).toEqual({ id: 1, name: "example1" });
    expect(getByIdSpy).toHaveBeenCalledWith(1);
  });
  test("create", async () => {
    const createSpy = jest.spyOn(ExampleService.prototype, "create");
    const controller = new ExampleController();
    createSpy.mockResolvedValue(true);

    const result = await controller.create({ id: 1, name: "example1" });

    expect(result).toBe(true);
    expect(createSpy).toHaveBeenCalledWith({ id: 1, name: "example1" });
  });
  test("update", async () => {
    const updateSpy = jest.spyOn(ExampleService.prototype, "update");
    const controller = new ExampleController();
    updateSpy.mockResolvedValue(true);

    const result = await controller.update({ id: 1, name: "example1" });

    expect(result).toBe(true);
    expect(updateSpy).toHaveBeenCalledWith({ id: 1, name: "example1" });
  });
  test("delete", async () => {
    const deleteSpy = jest.spyOn(ExampleService.prototype, "delete");
    const controller = new ExampleController();
    deleteSpy.mockResolvedValue(true);

    const result = await controller.delete(1);

    expect(result).toBe(true);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
