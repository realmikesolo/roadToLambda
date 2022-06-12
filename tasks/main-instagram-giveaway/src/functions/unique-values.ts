export function uniqueValues(data: string[]): Set<string> {
  return new Set(data.join('\n').split('\n'));
}
