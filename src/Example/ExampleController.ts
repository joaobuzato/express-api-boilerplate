import Database from "../Infra/Database";
import { Example } from "./Example";
import ExampleRepository from "./ExampleRepository";
import ExampleService from "./ExampleService";

export default class ExampleController {
  private service: ExampleService;
  constructor() {
    const database = new Database();
    const repository = new ExampleRepository(database);
    this.service = new ExampleService(repository);
  }

  async getAll(): Promise<Example[]> {
    return await this.service.getAll();
  }
  async getById(id: number): Promise<Example> {
    return await this.service.getById(id);
  }
  async create(example: Example): Promise<boolean> {
    return await this.service.create(example);
  }
  async update(example: Example): Promise<boolean> {
    return await this.service.update(example);
  }
  async delete(id: number): Promise<boolean> {
    return await this.service.delete(id);
  }
}
