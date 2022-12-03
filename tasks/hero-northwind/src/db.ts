import { Sequelize } from 'sequelize-typescript';
import { Env } from './env';
import { OrderModel } from './models/order';
import { TerritoryModel } from './models/territory';

export let db: Sequelize;

export async function connectDB(): Promise<void> {
  db = new Sequelize({
    database: Env.DB_NAME,
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    dialect: 'postgres',
    username: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    models: [OrderModel, TerritoryModel],
    logging: false,
  });

  await db.authenticate();
  await db.sync();

  console.log('Connection to DB has been established successfully.');
}
