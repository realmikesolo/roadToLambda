import { Db, MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL!);
export let db: Db;

export async function connectMongo(): Promise<void> {
  await client.connect();

  console.log('Successfuly connected to Mongo');

  db = client.db('authorization');

  db.collection('jtis').createIndex({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 3600 });
}
