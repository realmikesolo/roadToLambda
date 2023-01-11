export const Env = {
  SERVER_PORT: Number(process.env.SERVER_PORT!),
  SERVER_HOST: process.env.SERVER_HOST!,

  DB_USERNAME: process.env.DB_USERNAME!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT!),

  PAGE_LIMIT: Number(process.env.PAGE_LIMIT!),

  IP_LOC_API_KEY: process.env.IP_LOC_API_KEY!,

  AIR_LABS_API_KEY: process.env.AIR_LABS_API_KEY!,
  AIRPORT_DISTANCE: Number(process.env.AIRPORT_DISTANCE!),
};
