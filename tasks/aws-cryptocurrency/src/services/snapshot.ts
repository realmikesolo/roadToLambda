import { db } from '../db';
import { SnapshotModel } from '../models/snapshot';
import { CoinbaseSource } from '../sources/coinbase';
import { CoinmarketcapSource } from '../sources/coinmarketcap';
import { Source } from '../sources/source';

export class SnapshotService {
  public async sync(): Promise<void> {
    const snapshotRepo = db.getRepository(SnapshotModel);

    const snapshots: Record<string, SnapshotModel> = {};

    const coinmarketcap = await this.loadFromSource(new CoinmarketcapSource());
    const coinbase = await this.loadFromSource(new CoinbaseSource(), [
      ...coinmarketcap.coins.keys(),
    ]);

    [coinmarketcap, coinbase].forEach(({ name, coins }) => {
      [...coins.entries()].forEach(([symbol, price]) => {
        if (!snapshots[symbol]) {
          snapshots[symbol] = new SnapshotModel();
          snapshots[symbol].cryptocurrencyName = symbol;
        }

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
      name: source.constructor.name.toLowerCase(),
      coins: await source.getPrices(symbols),
    };
  }
}

export type SourceCoins = Array<{
  name: string;
  price: number;
}>;
