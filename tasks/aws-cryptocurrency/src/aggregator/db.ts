import { DataSource } from 'typeorm';
import { Env } from '../env';
import { SnapshotModel } from './models/snapshot';
import { UserModel } from './models/user';
import Redis from 'ioredis';

export let db: DataSource;
export const redis = new Redis();

export async function connectDB(): Promise<void> {
  db = new DataSource({
    type: 'mysql',
    host: Env.SQL_HOST,
    port: Env.SQL_PORT,
    username: Env.SQL_USERNAME,
    password: Env.SQL_PASSWORD,
    database: 'cryptocurrency',
    entities: [SnapshotModel, UserModel],
    synchronize: true,
  });

  await db
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((e) => {
      console.error('Error during Data Source initialization', e);
    });
}
