import bodyParser from 'body-parser';
import express from 'express';
import { coinRouter } from './routes/coin';

export async function startServer(port = 82): Promise<void> {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', coinRouter);

  await new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject);
  });

  console.log('Server started on', port);
}
