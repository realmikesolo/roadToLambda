import { uniqueValues } from './unique-values';

export function existInAllFiles(data: string[]): number {
  const unique = uniqueValues(data); // unique values across all files
  const sets = data.map((item) => new Set(item.split('\n'))); // transform to sets for better performance

  return [...unique].filter((value) => sets.every((set) => set.has(value))).length;
}
