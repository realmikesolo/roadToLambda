import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existInAllFiles } from './functions/exist-in-all-files';
import { existInAtLeastTen } from './functions/exist-in-at-least-ten';
import { uniqueValues } from './functions/unique-values';

const dataPath = resolve(__dirname, '../data/');

async function loadData(): Promise<string[]> {
  const files = await readdir(dataPath);
  return Promise.all(files.map((file) => readFile(resolve(dataPath, file), 'utf8')));
}

(async () => {
  const data = await loadData();

  console.log({
    uniqueValues: uniqueValues(data).size,
    existInAllFiles: existInAllFiles(data),
    existInAtLeastTen: existInAtLeastTen(data),
  });
})();
