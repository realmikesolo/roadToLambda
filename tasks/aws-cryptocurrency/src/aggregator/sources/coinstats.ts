import axios from 'axios';
import { Source } from './source';

export class CoinstatsSource extends Source {
  public async getPrices(): Promise<Map<string, number>> {
    console.log(this.constructor.name, `Fetching ...`);
    const result: Map<string, number> = new Map();

    const data = await axios
      .get('https://api.coinstats.app/public/v1/coins?limit=100&currency=USD')
      .then((res) => res.data.coins);

    data.forEach((coin) => result.set(coin.symbol, coin.price));

    return result;
  }
}
