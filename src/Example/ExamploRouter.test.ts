import app from "../app";
import request from "supertest";
import ExampleRepository from "./ExampleRepository";

describe("GET /examples", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ExampleRepository.prototype.getAll = jest
    .fn()
    .mockResolvedValue([{ id: 1, name: "example" }]);
  it("should return 200 and a list of examples", async () => {
    const response = await request(app).get("/examples");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "example" }]);
  });
});
describe("GET /examples/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ExampleRepository.prototype.getById = jest
    .fn()
    .mockResolvedValue({ id: 1, name: "example" });
  it("should return 200 and an example", async () => {
    const response = await request(app).get("/examples/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "example" });
  });
  it("should return 400 if id is not a number", async () => {
    const response = await request(app).get("/examples/invalid");
    expect(response.status).toBe(400);
  });
  it("should return 404 if example is not found", async () => {
    ExampleRepository.prototype.getById = jest
      .fn()
      .mockResolvedValue(undefined);
    const response = await request(app).get("/examples/1");
    expect(response.status).toBe(404);
  });
});
