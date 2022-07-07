export function meanPrice(coin): number {
  const { result, sourceCount } = Object.entries(coin).reduce(
    (acc, [key, value]: [string, number | null]) => {
      if (key.endsWith('Value') && value !== null) {
        acc.result += value;
        acc.sourceCount++;
      }

      return acc;
    },
    { result: 0, sourceCount: 0 },
  );

  return result / sourceCount;
}

export function roundPrice(price: number): string {
  if (!price) throw new Error('No price');

  if (price < 1) {
    let value = price.toString();
    if (value.includes('e')) {
      value = price.toFixed(20);
    }

    const index = [...value].findIndex((el) => el !== '0' && el !== '.');

    return value.slice(0, index + 3);
  }

  return price.toFixed(3);
}
