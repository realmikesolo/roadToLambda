import { Request, Response } from 'express';
import { MoreThan } from 'typeorm';
import { Env } from '../../env';
import { meanPrice } from '../functions/price';
import { SnapshotModel } from '../models/snapshot';

export class CoinController {
  public async getCoins(req: Request, res: Response): Promise<void> {
    const result: Record<string, number> = {};

    const recentList = await SnapshotModel.find({
      where: {
        createdAt: MoreThan(new Date(Date.now() - (Env.STAGE === 'dev' ? 24 * 60 : 6) * 60 * 1000)),
      },
      take: 20,
      order: { createdAt: 'DESC' },
    });

    for (const coin of recentList) {
      result[coin.cryptocurrencyName] = meanPrice(coin);
    }

    res.status(200).send(result);
  }

  public async getCoin(req: Request, res: Response): Promise<void> {
    const snapshots = await SnapshotModel.find({
      where: {
        cryptocurrencyName: req.query.coin?.toString(),
        createdAt: MoreThan(new Date(Date.now() - 24 * 60 * 60 * 1000)),
      },
    });

    const terms = [30, 60, 3 * 60, 6 * 60, 12 * 60, 24 * 60];

    const result = terms.map((term) => {
      const filtered = snapshots.filter(
        (snapshot) => snapshot.createdAt > new Date(Date.now() - term * 60 * 1000),
      );

      return {
        term,
        price: filtered.reduce((acc, value) => acc + meanPrice(value), 0) / filtered.length,
      };
    });

    res.status(200).send(result);
  }
}
