import axios from 'axios';
import { Env } from '../../env';
import { Source } from './source';

export class CoinbaseSource extends Source {
  public async getPrices(symbols: string[]): Promise<Map<string, number>> {
    const result: Map<string, number> = new Map();

    for (const coin of symbols) {
      console.log(this.constructor.name, `Fetching ${coin}...`);

      const data = await axios
        .get(`https://api.coinbase.com/v2/prices/${coin}-USD/buy`, {
          headers: {
            'CB-ACCESS-KEY': Env.COINBASE_API,
          },
        })
        .then((res) => res.data.data)
        .catch((e) => {
          if (e.response?.status === 404) return null;
          throw e;
        });
      if (!data) continue;

      result.set(data.base, Number(data.amount));
    }

    return result;
  }
}
