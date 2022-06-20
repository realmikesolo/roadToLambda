import axios from 'axios';
import { Source } from './source';

export class KucoinSource extends Source {
  public async getPrices(symbols: string[]): Promise<Map<string, number>> {
    const result: Map<string, number> = new Map();

    for (const coin of symbols) {
      console.log(this.constructor.name, `Fetching ${coin}...`);

      const data = await axios
        .get(`https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${coin}-USDT`)
        .then((res) => res.data.data)
        .catch((e) => {
          if (e.response?.status === 404) return null;
          throw e;
        });
      if (!data) continue;

      result.set(coin, Number(data.price));
    }

    return result;
  }
}
