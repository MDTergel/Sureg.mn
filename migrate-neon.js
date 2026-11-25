import path from "node:path";
import { migrateSqliteToNeon } from "./database.js";

const sqlitePath = process.argv[2] || path.resolve("data", "unaga.db");

try {
  await migrateSqliteToNeon(sqlitePath);
  console.log(`SQLite data migrated to Neon from ${sqlitePath}.`);
} catch (error) {
  console.error("Neon migration failed. Verify DATABASE_URL, the source SQLite file, and Neon network access.");
  process.exitCode = 1;
}
