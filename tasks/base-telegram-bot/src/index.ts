import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { forecast } from './functions/forecast';
import { dollar, euro } from './functions/exchange-rates';
import { genMessage } from './functions/message';
import { Env } from './env';

const bot = new TelegramBot(Env.BOT_CHAKA_TOKEN, { polling: true });

bot.onText(/((\bstart\b)|(\bback\b))/, async (msg) => {
  const opts: any = {
    reply_markup: JSON.stringify({
      keyboard: [['Погода в Киеве'], ['Курс USD'], ['Курс EUR']],
    }),
  };

  await bot.sendMessage(msg.chat.id, 'Нажмите на нужную вам кнопку', opts);
});

bot.onText(/^Погода в Киеве$/, async (msg) => {
  const opts: any = {
    reply_markup: JSON.stringify({
      keyboard: [['C интервалом 3 часа'], ['C интервалом 6 часов'], ['back']],
    }),
  };

  await bot.sendMessage(msg.chat.id, 'Выберите интервал', opts);
});

bot.onText(/^C интервалом 3 часа$/, async (msg) => {
  const output = await forecast();

  await bot.sendMessage(msg.chat.id, genMessage(output));
});

bot.onText(/^C интервалом 6 часов$/, async (msg) => {
  const output = await forecast().then((res) =>
    res.map((arr) => arr.filter((x) => Number(x.time.split(':')[0]) % 6 === 0)),
  );
  if (!output[0][0]?.date) {
    output.shift();
  }

  await bot.sendMessage(msg.chat.id, genMessage(output));
});

bot.onText(/^Курс USD$/, async (msg) => {
  const data = await dollar();

  await bot.sendMessage(
    msg.chat.id,
    `Валюта: USD\nMonobank:\nПокупка: ${data.mono?.rateBuy}\nПродажа: ${data.mono?.rateSell}\nPrivatbank:\nПокупка: ${data.privat?.buy}\nПродажа: ${data.privat?.sale}`,
  );
});

bot.onText(/^Курс EUR$/, async (msg) => {
  const data = await euro();

  await bot.sendMessage(
    msg.chat.id,
    `Валюта: EUR\nMonobank:\nПокупка: ${data.mono?.rateBuy}\nПродажа: ${data.mono?.rateSell}\nPrivatbank:\nПокупка: ${data.privat?.buy}\nПродажа: ${data.privat?.sale}`,
  );
});
