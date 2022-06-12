import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRouter = Router();
const controller = new UserController();

userRouter.use('/', controller.middleware);
userRouter.get('/:name(me0|me1|me2|me3|me4|me5|me6|me7|me8|me9)', controller.getData);
