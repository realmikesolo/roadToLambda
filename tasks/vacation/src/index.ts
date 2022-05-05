import data from '../data/origin.json';
import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { transformData } from './transform-data';

const dataPath = resolve(__dirname, '../data/new.json');

(async () => {
  const result = transformData(data);

  console.dir(result, { depth: null });
  await writeFile(dataPath, JSON.stringify(result, null, 2));
})();
