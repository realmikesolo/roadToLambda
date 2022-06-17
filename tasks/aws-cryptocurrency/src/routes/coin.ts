import { Router } from 'express';
import { CoinController } from '../controllers/coin';

export const coinRouter = Router();
const controller = new CoinController();

coinRouter.get('/get_coin', controller.getData);
