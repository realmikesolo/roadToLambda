import axios from 'axios';

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
          apikey: process.env.SHORTER_API_KEY!,
        },
      },
    )
    .then((response) => response.data.shortUrl);
}
