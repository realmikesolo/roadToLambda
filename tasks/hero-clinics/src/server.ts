import fastify from 'fastify';
import { Env } from './env';

export async function startServer(port = Env.SERVER_PORT): Promise<void> {
  const app = fastify();

  app
    .listen({ port })
    .then(() => console.log('Server started on', port))
    .catch((e) => console.error(e));
}
