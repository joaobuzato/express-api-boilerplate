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
}
