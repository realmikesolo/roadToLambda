import { db } from '../db';
import { SnapshotModel } from '../models/snapshot';
import { CoinbaseSource } from '../sources/coinbase';
import { CoinmarketcapSource } from '../sources/coinmarketcap';
import { CoinpaprikaSource } from '../sources/coinpaprika';
import { CoinstatsSource } from '../sources/coinstats';
import { KucoinSource } from '../sources/kucoin';
import { Source } from '../sources/source';

export class SnapshotService {
  public async sync(): Promise<void> {
    const snapshotRepo = db.getRepository(SnapshotModel);

    const snapshots: Record<string, SnapshotModel> = {};

    const coinmarketcap = await this.loadFromSource(new CoinmarketcapSource());
    const symbols = [...coinmarketcap.coins.keys()];

    [
      coinmarketcap,
      ...(await Promise.all([
        this.loadFromSource(new CoinbaseSource(), symbols),
        this.loadFromSource(new CoinstatsSource()),
        this.loadFromSource(new KucoinSource(), symbols),
        this.loadFromSource(new CoinpaprikaSource()),
      ])),
    ].forEach(({ name, coins }) => {
      [...coins.entries()].forEach(([symbol, price]) => {
        if (name === `coinmarketcap`) {
          snapshots[symbol] = new SnapshotModel();
          snapshots[symbol].cryptocurrencyName = symbol;
        } else if (!snapshots[symbol]) return;

        snapshots[symbol][`${name}Value`] = price;
      });
    });

    await Promise.all(Object.values(snapshots).map((snapshot) => snapshotRepo.save(snapshot)));
  }

  private async loadFromSource(
    source: Source,
    symbols?: string[],
  ): Promise<{
    name: string;
    coins: Map<string, number>;
  }> {
    return {
      name: source.constructor.name.toLowerCase().replace('source', ''),
      coins: await source.getPrices(symbols),
    };
  }
}

export type SourceCoins = Array<{
  name: string;
  price: number;
}>;
