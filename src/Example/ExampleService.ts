import ExampleRepository from "./ExampleRepository";
import { Example } from "./Example";

export default class ExampleService {
  private repository: ExampleRepository;
  constructor(repository: ExampleRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<Example[]> {
    return await this.repository.getAll();
  }
}
