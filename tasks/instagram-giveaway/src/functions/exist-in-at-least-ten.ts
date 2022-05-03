import { uniqueValues } from './unique-values';

export function existInAtLeastTen(data: string[]): number {
  const unique = uniqueValues(data);
  const sets = data.map((item) => new Set(item.split('\n'))); // transform to sets for better performance
  return [...unique].filter((value) => sets.filter((set) => set.has(value)).length >= 10).length;
}
