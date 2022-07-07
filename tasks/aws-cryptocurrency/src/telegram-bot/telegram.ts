import axios from 'axios';
import { Update } from 'node-telegram-bot-api';
import { roundPrice } from '../aggregator/functions/price';
import { UserModel } from '../aggregator/models/user';
import { Env } from '../env';

let offset: number;

export class TelegramBot {
  public async getUpdates(): Promise<void> {
    const data = await axios
      .get(`https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/getUpdates`, {
        params: { offset, timeout: 1 },
      })
      .then((res) => res.data);

    if (data.result.length) {
      offset = data.result.at(-1).update_id + 1;

      data.result.forEach((update: Update) => this.handler(update));
    }

    this.getUpdates();
  }

  public async handler(update: Update): Promise<void> {
    if (update.message) {
      const chatId = update.message.chat.id;
      const command = update.message.text;

      if (command === '/start') {
        await this.start(chatId);
      } else if (command === '/listRecent') {
        await this.listRecent(chatId);
      } else if (command?.match(/^\/[A-Z]+$/)) {
        await this.getCoin(chatId, command.replace('/', ''));
      } else if (command?.split(' ')[0] === '/addToFavourite') {
        await this.addToFavourite(chatId, command!.split(' ')[1]);
      } else if (command === '/help') {
        await this.help(chatId);
      } else if (command?.split(' ')[0] === '/deleteFavourite') {
        await this.deleteFavourite(chatId, command.split(' ')[1]);
      } else if (command === '/listFavourite') {
        await this.listFavourite(chatId);
      }
    } else if (update.callback_query?.message) {
      const data = update.callback_query.data;
      const chatId = update.callback_query.message.chat.id;
      const text = update.callback_query?.message.text!.split(' ')[0];

      if (data === 'add') {
        await this.addToFavourite(chatId, text);
      } else if (data === 'remove') {
        await this.deleteFavourite(chatId, text);
      }
    }
  }

  public async start(chatId: number): Promise<void> {
    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      { params: { chat_id: chatId, text: 'Welcome!' } },
    );
  }

  public async help(chatId: number): Promise<void> {
    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      {
        params: {
          chat_id: chatId,
          text: [
            'Telegram bot, который позволяет получать и обратывать информацию о криптовалюте из разных источников',
            '/start - возвращает приветственное сообщение',
            '/help - возвращает краткую информацию о боте и его список команд',
            '/listRecent - список "хайповой" крипты',
            '/{currency_symbol} - получить подробную информацию о криптовалюте',
            '/addToFavourite {currency_symbol} - Добавляет крипту в раздел "избранное"',
            '/listFavourite - возвращает лист избранной крипты',
            '/deleteFavourite {currency_symbol} - удаляет крипту из избранного',
          ].join('\n'),
        },
      },
    );
  }

  public async getCoin(chatId: number, coin: string): Promise<void> {
    const data = await axios
      .get(`http://${Env.SERVER_URL}:${Env.SERVER_PORT}/get_coin`, { params: { coin } })
      .then((res) => res.data);

    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      {
        params: {
          chat_id: chatId,
          text: `${coin} price for:\n${data
            .map(
              ({ term, price }) =>
                `${term >= 60 ? `${term / 60}h` : `${term}m`} - ${roundPrice(price)}$`,
            )
            .join('\n')}`,
          reply_markup: JSON.stringify({
            inline_keyboard: [
              (await UserModel.findOne({ where: { userId: chatId, cryptocurrencyName: coin } }))
                ? [{ text: 'Remove from following', callback_data: 'remove' }]
                : [{ text: 'Add to following', callback_data: 'add' }],
            ],
          }),
        },
      },
    );
  }

  public async listRecent(chatId: number): Promise<void> {
    const data = await axios
      .get(`http://${Env.SERVER_URL}:${Env.SERVER_PORT}/get_coins`)
      .then((res) => res.data);

    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      {
        params: {
          chat_id: chatId,
          text: Object.entries(data)
            .map(([key, value]) => `/${key} - ${roundPrice(value as any)}$`)
            .join('\n'),
        },
      },
    );
  }

  public async addToFavourite(chatId: number, coin: string): Promise<void> {
    let message = 'Coin has been added';

    try {
      await axios.post(
        `http://${Env.SERVER_URL}:${Env.SERVER_PORT}/favourite`,
        {},
        { params: { userId: chatId, coin } },
      );
    } catch (e) {
      if (e.response.status === 404) {
        message = 'Coin does not exist';
      } else if (e.response.status === 409) {
        message = 'Coin has been already added';
      }
    }

    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      { params: { chat_id: chatId, text: message } },
    );
  }

  public async deleteFavourite(chatId: number, coin: string): Promise<void> {
    let message = 'Coin has been deleted';

    try {
      await axios.delete(`http://${Env.SERVER_URL}:${Env.SERVER_PORT}/deleteFavourite`, {
        params: { userId: chatId, coin },
      });
    } catch (e) {
      if (e.response.status === 404) {
        message = 'Coin not found';
      }
    }

    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      { params: { chat_id: chatId, text: message } },
    );
  }

  public async listFavourite(chatId: number): Promise<void> {
    const data = await axios
      .get(`http://${Env.SERVER_URL}:${Env.SERVER_PORT}/listFavourite`, {
        params: { userId: chatId },
      })
      .then((res) => res.data);

    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      {
        params: {
          chat_id: chatId,
          text: `My favourite cryptocurrencies:\n${data
            .map(
              (obj: { id: number; userId: number; cryptocurrencyName: string }) =>
                `/${obj.cryptocurrencyName}`,
            )
            .join('\n')}`,
        },
      },
    );
  }
}
