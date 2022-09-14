import { Sequelize } from 'sequelize-typescript';
import { Env } from './env';
import { LinkModel } from './models/link';

export let db: Sequelize;

export async function connectDB(): Promise<void> {
  db = new Sequelize({
    database: Env.DB_NAME,
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    dialect: 'postgres',
    username: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    models: [LinkModel],
    logging: false,
  });
  try {
    await db.authenticate();
    await db.sync();

    console.log('Connection has been established successfully.');
  } catch (e) {
    console.error('Unable to connect to the database:', e);
  }
}
