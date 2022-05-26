import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const authRouter = Router();
const controller = new AuthController();

authRouter.post('/sign_up', controller.registration);
authRouter.post('/login', controller.login);
authRouter.post('/refresh', controller.refreshToken);
