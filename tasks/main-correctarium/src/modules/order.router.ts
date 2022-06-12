import { Router } from 'express';
import { create } from './order.controller';

export const mainRouter = Router();
mainRouter.use('/', create);
