import axios from 'axios';
import { Env } from './env';

export async function shorterLink(url: string): Promise<string> {
  return await axios
    .post(
      'https://api.rebrandly.com/v1/links',
      {
        title: 'link',
        destination: url,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: Env.SHORTER_API_KEY,
        },
      },
    )
    .then(({ data }) => data.shortUrl);
}
