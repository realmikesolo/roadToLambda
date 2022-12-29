import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { OrderController } from './order.controller';
import OrderModel from '../../models/order';
import ProductModel from '../../models/product';

const orderController = new OrderController();

const GetOrdersOptions = {
  schema: {
    querystring: Type.Object({ page: Type.Number() }),
  },
};

const GetOrderOptions = {
  schema: {
    querystring: Type.Object({ id: Type.Number() }),
  },
};

export async function orderRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/orders', GetOrdersOptions, (req: GetOrdersRequest, res) =>
    orderController.getOrders(req, res),
  );

  fastify.get('/order', GetOrderOptions, (req: GetOrderRequest, res) =>
    orderController.getOrder(req, res),
  );
}

export type Order = Pick<
  OrderModel,
  | 'orderID'
  | 'customerID'
  | 'employeeID'
  | 'orderDate'
  | 'requiredDate'
  | 'shippedDate'
  | 'shipVia'
  | 'freight'
  | 'shipName'
  | 'shipAddress'
  | 'shipCity'
  | 'shipRegion'
  | 'shipPostalCode'
  | 'shipCountry'
> & {
  shipViaCompanyName: string;
  totalProductsDiscount: number;
  totalProductsPrice: number;
  totalProductsItems: number;
  totalProducts: number;
};

export type GetOrderRequest = FastifyRequest<{
  Querystring: Static<typeof GetOrderOptions['schema']['querystring']>;
}>;

export type GetOrdersRequest = FastifyRequest<{
  Querystring: Static<typeof GetOrdersOptions['schema']['querystring']>;
}>;

export type GetOrderResponse = {
  order: Order;
  products: ProductModel[];
};

export type GetOrdersResponse = {
  page: number;
  pages: number;
  items: number;
  total: number;
  orders: Array<Omit<Order, 'shipViaCompanyName'>>;
};
