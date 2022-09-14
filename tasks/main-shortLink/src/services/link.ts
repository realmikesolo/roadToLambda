import { randomUUID } from 'node:crypto';
import { PgErrors } from 'pg-constants';
import { Env } from '../env';
import { LinkModel } from '../models/link';

export class LinkService {
  public async getShortLink(link: string): Promise<HttpResponse> {
    try {
      const shortLink = await this.createShortLink(link);

      return {
        statusCode: 201,
        message: `${Env.SERVER_HOST}:${Env.SERVER_PORT}/${shortLink}`,
      };
    } catch (e) {
      console.error(e);

      return { statusCode: 500, message: 'Internal Server Error' };
    }
  }

  private async createShortLink(link: string): Promise<string> {
    try {
      const shortLink = this.genRandomString(8);
      await LinkModel.create({ id: randomUUID(), link, shortLink });

      return shortLink;
    } catch (e) {
      if (e.code === PgErrors.UNIQUE_VIOLATION) {
        return this.createShortLink(link);
      }

      throw e;
    }
  }

  private genRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}

export interface HttpResponse {
  statusCode: number;
  message: string;
}
