import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance, FastifyRequest } from 'fastify';
import CustomerModel from '../../models/customer';
import { CustomerController } from './customer.controller';

const customerController = new CustomerController();

const GetCustomersOptions = {
  schema: {
    querystring: Type.Object({ page: Type.Number() }),
  },
};

const GetCustomerOptions = {
  schema: {
    querystring: Type.Object({ id: Type.String() }),
  },
};

export async function customerRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/customers', GetCustomersOptions, (req: GetCustomersRequest, res) =>
    customerController.getCustomers(req, res),
  );

  fastify.get('/customer', GetCustomerOptions, (req: GetCustomerRequest, res) =>
    customerController.getCustomer(req, res),
  );
}

export type GetCustomersRequest = FastifyRequest<{
  Querystring: Static<typeof GetCustomersOptions['schema']['querystring']>;
}>;

export type GetCustomersResponse = {
  page: number;
  pages: number;
  items: number;
  total: number;
  customers: Customer[];
};

export type GetCustomerRequest = FastifyRequest<{
  Querystring: Static<typeof GetCustomerOptions['schema']['querystring']>;
}>;

export type GetCustomerResponse = {
  customer: Customer;
};

export type Customer = Pick<
  CustomerModel,
  | 'customerID'
  | 'companyName'
  | 'contactName'
  | 'contactTitle'
  | 'address'
  | 'city'
  | 'region'
  | 'postalCode'
  | 'country'
  | 'phone'
  | 'fax'
>;
