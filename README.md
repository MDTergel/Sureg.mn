# Sureg.mn

## Local development

Install dependencies and run the Vite frontend with the Express API:

```sh
npm install
npm run dev
```

Without `DATABASE_URL`, the API uses `data/unaga.db` (SQLite) and creates that database as needed.

## Neon / PostgreSQL

Create a Neon project and copy its pooled or direct connection string from the Neon dashboard. Set the connection string in your shell or hosting provider's environment settings; do not commit it or put it in frontend/Vite variables:

```sh
export DATABASE_URL='postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require'
npm run server
```

When `DATABASE_URL` is set, the Express API creates the required PostgreSQL tables on startup. The existing API routes use that persistent database instead of local SQLite.

To copy an existing local database to Neon, first make a backup, set `DATABASE_URL`, then run:

```sh
npm run migrate:neon
```

The migration reads `data/unaga.db`, creates any missing destination tables, and inserts rows without overwriting existing rows. It is safe to rerun to copy rows that have not yet been migrated. If the SQLite database is elsewhere, pass its path:

```sh
npm run migrate:neon -- /path/to/unaga.db
```

Uploaded files in `uploads/` are not stored in SQLite and are not copied by this command; move them to persistent storage separately if existing database rows reference them.

Check the Neon connection and application tables with:

```sh
npm run test:neon
```
