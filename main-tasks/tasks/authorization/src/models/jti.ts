import { db } from '../db';

export class JtiModel {
  public static async create(id: string): Promise<Jti> {
    return db.collection('jtis').insertOne({ _id: id as any, createdAt: new Date() }) as any;
  }

  public static async delete(query: Partial<Jti>): Promise<Jti> {
    return db.collection('jtis').deleteOne(query) as any;
  }

  public static async findOne(query: Partial<Jti>): Promise<Jti> {
    return db.collection('jtis').findOne(query) as any;
  }
}

interface Jti {
  _id: string;
  createdAt: Date;
}
