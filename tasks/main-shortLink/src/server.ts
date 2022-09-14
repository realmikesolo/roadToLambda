import express from 'express';
import bodyParser from 'body-parser';
import { Env } from './env';
import { linkRouter } from './routes/link';

export async function startServer(port = Env.SERVER_PORT): Promise<void> {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', linkRouter);

  await new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject);
  });

  console.log('Server started on', port);
}
