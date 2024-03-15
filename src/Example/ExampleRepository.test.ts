import ExampleRepository from "./ExampleRepository";
import Database from "../Infra/Database";
import { mock } from "jest-mock-extended";

describe("ExampleRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const database = mock<Database>();
  test("getAll", async () => {
    const repository = new ExampleRepository(database);
    database.query.mockResolvedValue([
      { id: 1, name: "example1" },
      { id: 2, name: "example2" },
      { id: 3, name: "example3" },
    ]);

    const examples = await repository.getAll();

    expect(examples).toEqual([
      { id: 1, name: "example1" },
      { id: 2, name: "example2" },
      { id: 3, name: "example3" },
    ]);
    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM example_database.example"
    );
  });
  test("getById", async () => {
    const repository = new ExampleRepository(database);
    database.query.mockResolvedValue([{ id: 1, name: "example1" }]);
    const example = await repository.getById(1);
    expect(example).toEqual({ id: 1, name: "example1" });
    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM example_database.example WHERE id = ?",
      [1]
    );
  });
  test("create", async () => {
    const repository = new ExampleRepository(database);
    await repository.create({ id: 1, name: "example1" });
    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO example_database.example (name) VALUES (?)",
      ["example1"]
    );
  });
  test("update", async () => {
    const repository = new ExampleRepository(database);
    await repository.update({ id: 1, name: "example1" });
    expect(database.query).toHaveBeenCalledWith(
      "UPDATE example_database.example SET name = ? WHERE id = ?",
      ["example1", 1]
    );
  });
  test("delete", async () => {
    const repository = new ExampleRepository(database);
    await repository.delete(1);
    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM example_database.example WHERE id = ?",
      [1]
    );
  });
});
