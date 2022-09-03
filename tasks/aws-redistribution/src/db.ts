import path from 'node:path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Env } from './env';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [path.resolve(__dirname, './models/*.{js,ts}')],
});
