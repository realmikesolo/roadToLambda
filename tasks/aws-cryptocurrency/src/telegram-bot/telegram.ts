import axios from 'axios';
import { Env } from '../Env';

export class TelegramBot {
  public async getData() {
    const data = await axios
      .get(`https://api.telegram.org/bot${Env.TELEGRAM_BOT_API}/getUpdates`)
      .then((res) => res.data);
    console.log(data);
  }
}
