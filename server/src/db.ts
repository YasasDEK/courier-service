import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "courier_service_db",
  password: "Dilshan@123",
  port: 8000,
});

export default pool;
