import { Request, Response } from 'express';
import { MoreThan } from 'typeorm';
import { Env } from '../../env';
import { db } from '../db';
import { SnapshotModel } from '../models/snapshot';

function meanPrice(coin): number {
  const { result, sourceCount } = Object.entries(coin).reduce(
    (acc, [key, value]: [string, number | null]) => {
      if (key.endsWith('Value') && value !== null) {
        acc.result += value;
        acc.sourceCount++;
      }

      return acc;
    },
    { result: 0, sourceCount: 0 },
  );

  return result / sourceCount;
}

export class CoinController {
  public async getData(req: Request, res: Response): Promise<void> {
    const snapshotRepo = db.getRepository(SnapshotModel);
    const result: Record<string, number> = {};

    const recentList = await snapshotRepo.find({
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
}
