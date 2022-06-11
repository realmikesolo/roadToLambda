import axios from 'axios';

const monoCache: { date: number; data: ExchangeRateMono[] } = { date: 0, data: [] };

async function getRatesMonobank(): Promise<ExchangeRateMono[]> {
  if (Date.now() > monoCache.date + 60_000) {
    const rates: ExchangeRateMono[] = await axios
      .get('https://api.monobank.ua/bank/currency')
      .then((res) => res.data);

    monoCache.date = Date.now();
    monoCache.data = rates;
  }

  return monoCache.data;
}

async function getRatesPrivatbank(): Promise<ExchangeRatePrivat[]> {
  return await axios
    .get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then((res) => res.data);
}

export async function dollar(): Promise<{
  mono: ExchangeRateMono;
  privat: ExchangeRatePrivat;
}> {
  const [mono, privat] = await Promise.all([
    getRatesMonobank().then(
      (res) =>
        res.find(
          (obj: ExchangeRateMono) => obj.currencyCodeA === 840 && obj.currencyCodeB === 980,
        )!,
    ),
    getRatesPrivatbank().then((res) => res.find((obj: ExchangeRatePrivat) => obj.ccy === 'USD')!),
  ]);

  return { mono, privat };
}

export async function euro(): Promise<{
  mono: ExchangeRateMono;
  privat: ExchangeRatePrivat;
}> {
  const [mono, privat] = await Promise.all([
    getRatesMonobank().then(
      (res) =>
        res.find(
          (obj: ExchangeRateMono) => obj.currencyCodeA === 978 && obj.currencyCodeB === 980,
        )!,
    ),
    getRatesPrivatbank().then((res) => res.find((obj: ExchangeRatePrivat) => obj.ccy === 'EUR')!),
  ]);

  return { mono, privat };
}

export type ExchangeRateMono = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateCross?: number;
  rateBuy?: number;
  rateSell?: number;
};

export type ExchangeRatePrivat = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};
