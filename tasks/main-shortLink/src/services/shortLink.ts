import { LinkModel } from '../models/link';
import { HttpResponse } from './link';

export class ShortLinkService {
  public async getShortLink(shortLink: string): Promise<HttpResponse> {
    const link = await LinkModel.findOne({ where: { shortLink } });
    if (!link) {
      return { statusCode: 401, message: 'Sorry, no such link found' };
    }

    return { statusCode: 201, message: link.link };
  }
}
