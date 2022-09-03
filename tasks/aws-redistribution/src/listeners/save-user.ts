import { SQSHandler } from 'aws-lambda';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../db';

let connected = false;

export const handler: SQSHandler = async (event) => {
  if (!connected) {
    await AppDataSource.initialize();

    connected = true;
  }

  await Promise.all(
    event.Records.map(async (x) => {
      const body = JSON.parse(x.body);
      const user = new User();

      user.id = body.id;
      user.shopToken = body.shopToken;
      user.email = body.email;
      user.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));

      await user.save();
    }),
  );
};
