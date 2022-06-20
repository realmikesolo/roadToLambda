import 'dotenv/config';
import { startServer } from './aggregator/server';
import cron from 'node-cron';
import { connectDB } from './aggregator/db';
import { SnapshotService } from './aggregator/services/snapshot';
import { TelegramBot } from './telegram-bot/telegram';

(async () => {
  await connectDB();
  await startServer();

  cron.schedule('*/5 * * * *', () => new SnapshotService().sync());

  new TelegramBot().getData();
})();
