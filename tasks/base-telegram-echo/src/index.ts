process.env['NTBA_FIX_319'] = '1';

import 'dotenv/config';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import { Env } from './env';

const bot = new TelegramBot(Env.BOT_TOKEN!, { polling: true });

console.log('Telegram bot has successfuly started...');

bot.onText(/\b(photo)\b/, async (msg) => {
  const ph = await axios.get('https://picsum.photos/200/300');

  await bot.sendPhoto(Env.CHAT_ID!, ph.request.res.responseUrl);
  console.log(`Пользователь ${msg.chat.username} запросил картинку`);
});

bot.on('message', async (msg) => {
  if (msg.text === 'photo') return;

  await bot.sendMessage(Env.CHAT_ID!, `Вы написали: '${msg.text}'`);
  console.log(`Пользователь ${msg.chat.username} написал: '${msg.text}'`);
});
