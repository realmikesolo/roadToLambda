import csv from 'csv-parser';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { Request, Response } from 'express';
import { ipToNum, numToIp } from '../utils';

const dataPath = resolve(__dirname, '../../data/data.CSV');
let data: Array<Item>;

async function getData(): Promise<Array<Item>> {
  const result: Array<Item> = [];

  data ??= await new Promise((resolve, reject) =>
    createReadStream(dataPath)
      .pipe(csv())
      .on('data', (data) => result.push(data))
      .on('end', () => resolve(result))
      .on('error', (e) => reject(e)),
  );
  return data;
}

export async function get(req: Request, res: Response): Promise<void> {
  try {
    const ip = (req.headers['x-forwarded-for'] as string) ?? req.ip.split(':').at(-1);
    const decIp = ipToNum(ip);

    const item = (await getData()).find(
      (obj) => Number(obj.ip_start) <= decIp && decIp <= Number(obj.ip_end),
    )!;

    res.status(200).send({
      country: item.country_name,
      ip,
      ipRange: `${numToIp(Number(item.ip_start))} - ${numToIp(Number(item.ip_end))}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
}

type Item = {
  ip_start: string;
  ip_end: string;
  country_code: string;
  country_name: string;
};
