import pg from "pg";
import { PG_PORT, PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD } from "./config.js";

export const pool = new pg.Pool({
  port: PG_PORT,
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
});

pool.on("connect", () => {
  console.log("Conectado a la base de datos");
});
