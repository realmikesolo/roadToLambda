export const Env = {
  STAGE: process.env.STAGE as 'dev' | 'prod',

  SERVER_URL: process.env.SERVER_URL,
  SERVER_PORT: Number(process.env.SERVER_PORT!),

  COINMARKETCAP_API: process.env.COINMARKETCAP_API!,

  COINBASE_API: process.env.COINBASE_API!,
  COINBASE_SECRET: process.env.COINBASE_SECRET!,

  SQL_PASSWORD: process.env.SQL_PASSWORD!,
  SQL_HOST: process.env.SQL_HOST,
  SQL_PORT: Number(process.env.SQL_PORT),
  SQL_USERNAME: process.env.SQL_USERNAME,

  TELEGRAM_BOT_API: process.env.TELEGRAM_BOT_API!,
};
