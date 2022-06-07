process.env['NTBA_FIX_319'] = '1';

import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });

console.log('Telegram bot has successfuly started...');

bot.onText(/\b(photo)\b/, async (msg) => {
  const ph = await axios.get('https://picsum.photos/200/300');

  await bot.sendPhoto(process.env.CHAT_ID!, ph.request.res.responseUrl);
  console.log(`Пользователь ${msg.chat.username} запросил картинку`);
});

bot.on('message', async (msg) => {
  if (msg.text === 'photo') return;

  await bot.sendMessage(process.env.CHAT_ID!, `Вы написали: '${msg.text}'`);
  console.log(`Пользователь ${msg.chat.username} написал: '${msg.text}'`);
});
