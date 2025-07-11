import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const knexDB = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  migrations: {
    tableName: "knex_migrations", // For tracking migrations
    directory: "./migrations", // Where migration files will live
  },
});

export default knexDB;
