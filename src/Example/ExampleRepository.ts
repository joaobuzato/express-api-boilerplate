import Database from "../Infra/Database";
import { Example } from "./Example";

export default class ExampleRepository {
  private database: Database;
  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Example[]> {
    const examples = await this.database.query<Example>(
      "SELECT * FROM example_database.example"
    );
    return examples;
  }
  async getById(id: number): Promise<Example> {
    const examples = await this.database.query<Example>(
      "SELECT * FROM example_database.example WHERE id = ?",
      [id]
    );
    return examples[0];
  }
  async create(example: Example): Promise<void> {
    await this.database.query(
      "INSERT INTO example_database.example (name) VALUES (?)",
      [example.name]
    );
  }
  async update(example: Example): Promise<void> {
    await this.database.query(
      "UPDATE example_database.example SET name = ? WHERE id = ?",
      [example.name, example.id]
    );
  }
  async delete(id: number): Promise<void> {
    await this.database.query(
      "DELETE FROM example_database.example WHERE id = ?",
      [id]
    );
  }
}
