import { Router } from 'express';
import { UserController } from '../controllers/user';

export const userRouter = Router();
const controller = new UserController();

userRouter.post('/favourite', controller.addToFavourite);
userRouter.delete('/deleteFavourite', controller.deleteFavourite);
userRouter.get('/listFavourite', controller.listFavourite);
