import 'dotenv/config';
import { connectDB } from './db';
import { startServer } from './server';

(async () => {
  await connectDB();
  await startServer();
})();
