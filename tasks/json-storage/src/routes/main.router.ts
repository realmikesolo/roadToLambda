import { Router } from 'express';
import { read, create, middleware } from '../controllers/main.controller';

export const mainRouter = Router();

mainRouter.use('/:id', middleware);

mainRouter.post('/:id', create);

mainRouter.get('/:id', read);
