import { db } from '../db';

export class UserModel {
  public static async create(query: Omit<User, '_id'>): Promise<User> {
    return db.collection('users').insertOne(query) as any;
  }

  public static async findOne(query: Partial<User>): Promise<User | null> {
    return db.collection('users').findOne(query) as any;
  }
}

interface User {
  _id: string;
  email: string;
  password: string;
}
