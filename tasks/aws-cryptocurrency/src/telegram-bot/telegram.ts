import axios from 'axios';
import { Update } from 'node-telegram-bot-api';
import { roundPrice } from '../aggregator/functions/price';
import { Env } from '../env';

let offset: number;

export class TelegramBot {
  public async getUpdates(): Promise<void> {
    console.log('request');

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
    if (!update.message) return;
    const command = update.message.text;

    if (command === '/start') {
      await this.start(update.message.chat.id);
    } else if (command === '/listRecent') {
      await this.listRecent(update.message.chat.id);
    } else if (command?.match(/^\/[A-Z]+$/)) {
      await this.getCoin(update.message.chat.id, command.replace('/', ''));
    }

    console.log(command);
  }

  private async start(chatId: number): Promise<void> {
    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      { params: { chat_id: chatId, text: 'Welcome!' } },
    );
  }

  private async listRecent(chatId: number): Promise<void> {
    const data = await axios.get('http://localhost:82/get_coins').then((res) => res.data);

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

  private async getCoin(chatId: number, coin): Promise<void> {
    const data = await axios
      .get('http://localhost:82/get_coin', { params: { coin } })
      .then((res) => res.data);

    await axios.post(
      `https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/sendMessage`,
      {},
      {
        params: {
          chat_id: chatId,
          text: data
            .map(
              ({ term, price }) =>
                `${term >= 60 ? `${term / 60}h` : `${term}m`} - ${roundPrice(price)}$`,
            )
            .join('\n'),
        },
      },
    );
  }

  public async addToFavourite(chatId: number) {}
}
