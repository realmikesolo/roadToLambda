import fetch from 'node-fetch';

async function fetchUrl(url: string, count = 0) {
  return fetch(url)
    .then((response) => response.json())
    .catch(() => {
      if (++count === 3) return {};
      return fetchUrl(url, count);
    });
}

function getValue(object: Record<string, any>): boolean | undefined {
  const arr: Array<Record<string, any>> = [];

  for (const [key, value] of Object.entries(object)) {
    if (key === 'isDone') {
      return value;
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      arr.push(value);
    }
  }
  for (const obj of arr) {
    return getValue(obj);
  }

  return;
}

export async function sort(urls: string[]): Promise<Record<string, number>> {
  let countTrue = 0;
  let countFalse = 0;

  for (const url of urls) {
    const result = getValue(await fetchUrl(url));
    if (result !== undefined) {
      result ? countTrue++ : countFalse++;
    }

    console.log(`${url} isDone - ${result}`);
  }

  return { 'Значений True': countTrue, 'Значений False': countFalse };
}
