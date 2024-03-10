import dotenv from "dotenv";
dotenv.config();

const config = {
  sqlConnection: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "password",
    multipleStatements: true,
  },
};

export default config;
