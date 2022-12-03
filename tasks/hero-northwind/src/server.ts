import Fastify from 'fastify';
import { Env } from './env';

export async function startServer(port = Env.SERVER_PORT): Promise<void> {
  const fastify = Fastify();

  await fastify.listen({ port });

  console.log(`Server started on ${port} port`);
}
