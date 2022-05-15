import express from 'express';
import bodyParser from 'body-parser';
import { mainRouter } from './modules/order.router';

export async function startServer(port = 80): Promise<void> {
  const app = express();

  app.use(bodyParser.json());
  app.use('/', mainRouter);

  await new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject);
  });

  console.log('Server started on', port);
}
