import express from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';

export async function startServer(port = 81): Promise<void> {
  const app = express();

  app.use(bodyParser.json());
  app.use('/auth', authRouter);
  app.use('/user', userRouter);

  await new Promise((resolve, reject) => {
    app.listen(port).once('listening', resolve).once('error', reject);
  });

  console.log('Server started on', port);
}
