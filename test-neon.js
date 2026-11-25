import { createDatabase } from "./database.js";

if (!process.env.DATABASE_URL) {
  console.error("Set DATABASE_URL to a Neon connection string before running this check.");
  process.exit(1);
}

try {
  const db = await createDatabase();
  for (const table of ["horses", "users", "races", "progeny", "pedigrees", "herds", "herd_members"]) {
    await db.prepare(`SELECT * FROM ${table} LIMIT 0`).all();
  }
  console.log("Neon connection and application tables are healthy.");
} catch (error) {
  console.error("Neon check failed. Verify DATABASE_URL and Neon network access.");
  process.exitCode = 1;
}
