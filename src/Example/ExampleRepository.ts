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
  async getById(id:number): Promise<Example> {
    const examples = await this.database.query<Example> (
      "SELECT * FROM example_database.example WHERE id = ?", [id]
    );
    return examples[0];
  }
}
