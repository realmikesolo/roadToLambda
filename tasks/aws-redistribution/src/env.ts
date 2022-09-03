export const Env = {
  AWS_REGION: process.env.AWS_REGION!,
  AWS_DISTRIBUTE_QUEUE_ARN: process.env.AWS_DISTRIBUTE_QUEUE_ARN!,
  AWS_DISTRIBUTE_QUEUE_URL: process.env.AWS_DISTRIBUTE_QUEUE_URL!,
  DB_NAME: process.env.DB_NAME!,
  DB_USERNAME: process.env.DB_USERNAME!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_PORT: Number(process.env.DB_PORT!),
  DB_HOST: process.env.DB_HOST!,
};
