import Fastify from 'fastify';
import { employeeRouter } from './app/employee/employee.router';
import { supplierRouter } from './app/supplier/supplier.router';
import { Env } from './env';

export async function startServer(port = Env.SERVER_PORT): Promise<void> {
  const fastify = Fastify();

  fastify.register(employeeRouter).register(supplierRouter);
  await fastify.listen({ port });

  console.log(`Server started on ${port} port`);
}
