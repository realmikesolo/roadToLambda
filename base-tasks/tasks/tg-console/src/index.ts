process.env['NTBA_FIX_319'] = '1';
process.env['NTBA_FIX_350'] = '1';

import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { Command } from 'commander';

const bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });
const program = new Command();

program.version('1.0.0').help;

program
  .command('message')
  .alias('m')
  .description('Send a message to telegram')
  .argument('<string>')
  .action(async (str) => {
    await bot.sendMessage(process.env.CHAT_ID!, str);

    process.exit();
  });

program
  .command('photo')
  .alias('p')
  .description('Send a photo to telegram')
  .argument('<string>')
  .action(async (str) => {
    await bot.sendPhoto(process.env.CHAT_ID!, str);
    console.log('You have successfuly sent your photo to telegram');

    process.exit();
  });

program.parse(process.argv);
