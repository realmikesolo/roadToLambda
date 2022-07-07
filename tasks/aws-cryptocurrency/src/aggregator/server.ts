import bodyParser from 'body-parser';
import express from 'express';
import { Env } from '../env';
import { coinRouter } from './routes/coin';
import { userRouter } from './routes/user';

export async function startServer(): Promise<void> {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', coinRouter);
  app.use('/', userRouter);

  await new Promise((resolve, reject) => {
    app.listen(Env.SERVER_PORT).once('listening', resolve).once('error', reject);
  });

  console.log('Server started on', Env.SERVER_PORT);
}
