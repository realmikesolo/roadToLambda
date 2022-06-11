import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import moment from 'moment';
import { forecast, Output } from './functions/forecast';

const bot = new TelegramBot(process.env.BOT_CHAKA_TOKEN!, { polling: true });

bot.onText(/((\bstart\b)|(\bback\b))/, async (msg) => {
  const opts: any = {
    reply_markup: JSON.stringify({
      keyboard: [['Погода в Киеве']],
    }),
  };

  await bot.sendMessage(msg.chat.id, 'Нажмите на нужную вам кнопку', opts);
});

bot.onText(/^Погода в Киеве$/, async (msg) => {
  const opts: any = {
    reply_markup: JSON.stringify({
      keyboard: [['C интервалом 3 часа'], ['C интервалом 6 часов'], ['Back']],
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

  await bot.sendMessage(msg.chat.id, genMessage(output));
});

function genMessage(output: Output[]): string {
  return `Погода в Киеве:\n${output
    .map(
      (arr) =>
        `${moment(arr[0].date).locale('ru').format('MMM D dddd')}:\n${arr
          .map(
            (obj) => `\t\t${obj.time}, ${obj.temperature}, ощущается: ${obj.feels}, ${obj.weather}`,
          )
          .join('\n')}\n`,
    )
    .join('\n')}`;
}
