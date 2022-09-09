import 'reflect-metadata';
import { SQSHandler } from 'aws-lambda';
import path from 'node:path';
import { DataSource } from 'typeorm';
import { Env } from '../env';
import { User } from '../models/user';

export const handler: SQSHandler = async (event) => {
  const AppDataSource = new DataSource({
    type: 'mysql',
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    username: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_NAME,
    synchronize: true,
    logging: true,
    connectTimeout: 50_000,
    acquireTimeout: 50_000,
    entities: [path.resolve(__dirname, '../models/*.{js,ts}')],
  });

  console.log('Connecting');
  console.log('Force connecting');

  await AppDataSource.initialize();

  console.log('Connected');
  let error;
  try {
    await User.insert(
      event.Records.map((x) => {
        const body = JSON.parse(x.body);
        const user = new User();

        user.id = body.id;
        user.shopToken = body.shopToken;
        user.email = body.email;
        user.password = body.password;

        return user;
      }),
    );
  } catch (e) {
    error = e;
    console.error(e);
  } finally {
    await AppDataSource.destroy();
  }
  if (error) {
    throw error;
  }
};
