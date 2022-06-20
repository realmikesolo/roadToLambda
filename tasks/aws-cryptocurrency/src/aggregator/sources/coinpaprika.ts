import axios from 'axios';
import { Source } from './source';

export class CoinpaprikaSource extends Source {
  public async getPrices(): Promise<Map<string, number>> {
    console.log(this.constructor.name, `Fetching ...`);
    const result: Map<string, number> = new Map();

    const data = await axios
      .get('https://api.coinpaprika.com/v1/tickers')
      .then((res) => res.data.slice(0, 100));

    data.forEach((coin) => result.set(coin.symbol, coin.quotes.USD.price));

    return result;
  }
}
