import { Request, Response } from 'express';
import { LinkService } from '../services/link';

export default class LinkController {
  private readonly linkService = new LinkService();

  public async getShortLink(req: Request, res: Response): Promise<void> {
    const link = req.body.url;
    const { statusCode, message } = await this.linkService.getShortLink(link);

    res.status(statusCode).send(message);
  }
}
