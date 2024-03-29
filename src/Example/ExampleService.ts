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
  async getById(id: number): Promise<Example> {
    return await this.repository.getById(id);
  }
  async create(example: Example): Promise<boolean> {
    if (!this.validate(example)) {
      return false;
    }
    return await this.repository.create(example);
  }
  async update(example: Example): Promise<boolean> {
    if (!this.validate(example)) {
      return false;
    }
    return await this.repository.update(example);
  }
  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  validate(example: Example): boolean {
    if (!example.name || example.name.length < 3 || example.name.length > 100) {
      return false;
    }
    return true;
  }
}
