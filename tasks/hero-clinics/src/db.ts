import { PgConnector } from 'drizzle-orm-pg';
import { Pool } from 'pg';
import { Env } from './env';

export let db; //TODO type

export async function connectDB(): Promise<void> {
  const pool = new Pool({
    host: Env.SERVER_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_NAME,
  });

  try {
    const connector = new PgConnector(pool);
    db = await connector.connect();

    console.log('Connection has been established successfully.');
  } catch (e) {
    console.error(e);
  }
}
