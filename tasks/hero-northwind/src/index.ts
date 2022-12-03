import 'dotenv/config';
import { connectDB } from './db';
import { startServer } from './server';

(async () => {
  try {
    await connectDB();
    await startServer();
  } catch (e) {
    console.error(e);

    process.exit(1);
  }
})();
