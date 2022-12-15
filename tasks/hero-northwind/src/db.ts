import path from 'node:path';
import { Sequelize } from 'sequelize-typescript';
import { Env } from './env';

export let db: Sequelize;

export async function connectDB(): Promise<void> {
  db = new Sequelize({
    database: Env.DB_NAME,
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    dialect: 'postgres',
    username: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    models: [path.resolve(__dirname, './models/*.{js,ts}')],
    logging: false,
  });

  await db.authenticate();
  await db.sync();

  console.log('Connection to DB has been established successfully.');
}
