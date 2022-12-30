import Fastify from 'fastify';
import { customerRouter } from './app/customer/customer.router';
import { employeeRouter } from './app/employee/employee.router';
import { orderRouter } from './app/order/order.router';
import { productRouter } from './app/product/product.router';
import { supplierRouter } from './app/supplier/supplier.router';
import { Env } from './env';

export async function startServer(port = Env.SERVER_PORT): Promise<void> {
  const fastify = Fastify();

  fastify
    .register(employeeRouter)
    .register(supplierRouter)
    .register(productRouter)
    .register(orderRouter)
    .register(customerRouter);

  await fastify.listen({ port });

  console.log(`Server started on ${port} port`);
}
