import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Request, Response, NextFunction } from 'express';

export function getFilePath(name: string): string {
  return resolve(__dirname, `../../data/${name}.json`);
}

export async function create(req: Request, res: Response): Promise<any> {
  try {
    const route = req.params.id;

    if (!Object.keys(req.body).length) {
      return res.status(400).send('Body is empty');
    }

    await writeFile(getFilePath(route), JSON.stringify(req.body));

    res.status(201).send('Created');
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
}

export async function read(req: Request, res: Response): Promise<void> {
  try {
    const route = req.params.id;

    const data = await readFile(getFilePath(route), 'utf8');

    res.status(200).send(data);
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.status(404).send('File does not exist');
      return;
    }
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
}

export async function middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!(req.params.id.length >= 2 && req.params.id.length <= 64)) {
    res.status(400).send('Route length must be in range from 2 to 64');
  } else if (!req.params.id.match(/^[\w-]+$/)) {
    res.status(400).send('Invalid symbols');
  } else {
    next();
  }
}
