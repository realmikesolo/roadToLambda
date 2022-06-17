import { DataSource } from 'typeorm';
import { SnapshotModel } from './models/snapshot';

export let db: DataSource;

export async function connectDB(): Promise<void> {
  db = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'cryptocurrency',
    entities: [SnapshotModel],
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
