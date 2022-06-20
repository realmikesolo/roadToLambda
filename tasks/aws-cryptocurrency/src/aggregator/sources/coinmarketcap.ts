import axios from 'axios';
import { Env } from '../../env';
import { Source } from './source';

export class CoinmarketcapSource extends Source {
  public async getPrices(): Promise<Map<string, number>> {
    console.log(this.constructor.name, `Fetching ...`);
    const coinArray = await axios
      .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': Env.COINMARKETCAP_API,
          Accept: 'application/json',
        },
      })
      .then((res) => res.data.data.slice(0, 20));

    const result: Map<string, number> = new Map();

    coinArray.forEach((coin) => result.set(coin.symbol, coin.quote.USD.price));

    return result;
  }
}
