import mysql, { ResultSetHeader } from "mysql2/promise";
import config from "../../config/index";

export default class Database {
  connect = () => {
    return mysql.createConnection(config.sqlConnection);
  };

  query = async <T>(
    query: string,
    options: Array<string | number> = []
  ): Promise<T[]> => {
    const connection = this.connect();
    return new Promise((resolve, reject) => {
      connection.then((connection) => {
        connection
          .query(query, options)
          .then(([rows]) => {
            resolve(rows as T[]);
          })
          .catch((err: string) => {
            console.log(err);
            reject(err);
          });
      });
    });
  };
  insertQuery = async (
    query: string,
    options: Array<string | number> = []
  ): Promise<ResultSetHeader> => {
    const connection = this.connect();
    return new Promise((resolve, reject) => {
      connection.then((connection) => {
        connection
          .query(query, options)
          .then(([rows]) => {
            resolve(rows as ResultSetHeader);
          })
          .catch((err: string) => {
            console.log(err);
            reject(err);
          });
      });
    });
  };
}
