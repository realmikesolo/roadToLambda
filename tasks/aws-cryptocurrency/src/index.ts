import 'dotenv/config';
import { startServer } from './aggregator/server';
import cron from 'node-cron';
import { connectDB } from './aggregator/db';
import { SnapshotService } from './aggregator/services/snapshot';
import { TelegramBot } from './telegram-bot/telegram';

process.on('uncaughtException', (err) => console.error(err));
process.on('unhandledRejection', (reason) => console.error(reason as any));

(async () => {
  await connectDB();
  await startServer();

  cron.schedule('*/5 * * * *', () => new SnapshotService().sync());

  new TelegramBot().getUpdates();
})();
