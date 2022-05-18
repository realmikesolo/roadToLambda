import { Router } from 'express';
import { get } from '../controllers/main.controller';

export const mainRouter = Router();

mainRouter.get('/', get);
