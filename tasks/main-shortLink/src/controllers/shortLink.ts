import { Request, Response } from 'express';
import { ShortLinkService } from '../services/shortLink';

export default class ShortLinkController {
  private readonly shortLinkService = new ShortLinkService();

  public async followShortLink(req: Request, res: Response): Promise<void> {
    const { statusCode, message } = await this.shortLinkService.getShortLink(req.url.slice(1));

    if (statusCode === 401) {
      res.status(statusCode).send(message);

      return;
    }

    res.status(statusCode).redirect(message);
  }
}
