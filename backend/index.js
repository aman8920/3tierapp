const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "postgres-service",
  database: process.env.DB_NAME || "todo",
  password: process.env.DB_PASSWORD || "postgres",
  port: 5432,
});

app.get("/api/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *", [title]);
  res.json(result.rows[0]);
});

const port = 3500;
app.listen(port, () => console.log(`Backend listening on port ${port}`));
