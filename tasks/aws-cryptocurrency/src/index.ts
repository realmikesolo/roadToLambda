import 'dotenv/config';
import { startServer } from './server';
import { connectDB } from './db';
import { SnapshotService } from './services/snapshot';

(async () => {
  await connectDB();
  await startServer();

  setInterval(() => new SnapshotService().sync(), 5 * 60 * 1000);
})();
