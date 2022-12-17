import Fastify from 'fastify';
import { Env } from './env';
import { employeesRoutes } from './routes/employees';

export async function startServer(port = Env.SERVER_PORT): Promise<void> {
  const fastify = Fastify();

  fastify.register(employeesRoutes);
  await fastify.listen({ port });

  console.log(`Server started on ${port} port`);
}
