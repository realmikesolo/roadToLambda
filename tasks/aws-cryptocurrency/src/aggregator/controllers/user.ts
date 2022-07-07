import { UserModel } from '../models/user';
import { Request, Response } from 'express';
import { SnapshotModel } from '../models/snapshot';

const user = new UserModel();

export class UserController {
  public async addToFavourite(req: Request, res: Response): Promise<void> {
    const cryptocurrencyName = req.query.coin?.toString();
    const userId = Number(req.query.userId);

    if (!(await SnapshotModel.findOne({ where: { cryptocurrencyName } }))) {
      res.status(404).send('Coin not found');
      return;
    }

    if (await UserModel.findOne({ where: { userId, cryptocurrencyName } })) {
      res.status(409).send('Con has been already added');
      return;
    }

    user.userId = userId;
    user.cryptocurrencyName = cryptocurrencyName!;

    await user.save();

    res.status(200).send('Coin was added');
  }

  public async deleteFavourite(req: Request, res: Response): Promise<void> {
    const cryptocurrencyName = req.query.coin?.toString();
    const userId = Number(req.query.userId);

    if (
      !(await SnapshotModel.findOne({ where: { cryptocurrencyName } })) ||
      !(await UserModel.findOne({ where: { userId, cryptocurrencyName } }))
    ) {
      res.status(404).send('Coin not found');
      return;
    }

    await UserModel.delete({ userId, cryptocurrencyName });

    res.status(200).send('Coin has been deleted');
  }

  public async listFavourite(req: Request, res: Response): Promise<void> {
    const listFavourite = await UserModel.find({ where: { userId: req.query.userId as any } });

    res.status(200).send(listFavourite);
  }
}
