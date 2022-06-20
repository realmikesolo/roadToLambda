export const Env = {
  STAGE: process.env.STAGE as 'dev' | 'prod',

  COINMARKETCAP_API: process.env.COINMARKETCAP_API!,

  COINBASE_API: process.env.COINBASE_API!,
  COINBASE_SECRET: process.env.COINBASE_SECRET!,

  SQL_PASSWORD: process.env.SQL_PASSWORD!,

  TELEGRAM_BOT_API: process.env.TELEGRAM_BOT_API!,
};
