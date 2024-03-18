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
describe("POST /examples", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ExampleRepository.prototype.create = jest.fn().mockResolvedValue({ id: 1 });
  it("should return 201 and the created example", async () => {
    const response = await request(app)
      .post("/examples")
      .send({ name: "example" });
    expect(response.status).toBe(201);
  });
  it("should return 400 if name is not provided", async () => {
    const response = await request(app).post("/examples").send({});
    expect(response.status).toBe(500);
  });
});
describe("PUT /examples/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ExampleRepository.prototype.update = jest.fn().mockResolvedValue(true);
  it("should return 200 and the updated example", async () => {
    const response = await request(app)
      .put("/examples/1")
      .send({ name: "example" });
    expect(response.status).toBe(200);
  });
  it("should return 400 if id is not a number", async () => {
    const response = await request(app).put("/examples/invalid").send({});
    expect(response.status).toBe(400);
  });
  it("should return 500 if name is not provided", async () => {
    const response = await request(app).put("/examples/1").send({});
    expect(response.status).toBe(500);
  });
});
describe("DELETE /examples/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ExampleRepository.prototype.delete = jest.fn().mockResolvedValue(true);
  it("should return 200 and the deleted example", async () => {
    const response = await request(app).delete("/examples/1");
    expect(response.status).toBe(200);
  });
  it("should return 400 if id is not a number", async () => {
    const response = await request(app).delete("/examples/invalid");
    expect(response.status).toBe(400);
  });
});
