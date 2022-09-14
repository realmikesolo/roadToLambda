import { Router } from 'express';
import LinkController from '../controllers/link';
import ShortLinkController from '../controllers/shortLink';

export const linkRouter = Router();
const linkController = new LinkController();
const shortLinkController = new ShortLinkController();

linkRouter.post('/link', (req, res) => linkController.getShortLink(req, res));
linkRouter.get('/:id', (req, res) => shortLinkController.followShortLink(req, res));
