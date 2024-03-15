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
  });
});
