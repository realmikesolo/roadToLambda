import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import OrderDetailModel from '../../models/orderDetail';
import ProductModel from '../../models/product';
import ShipperModel from '../../models/shippers';
import {
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
} from './order.router';
import { OrderService } from './order.service';

export class OrderController {
  private readonly orderService = new OrderService();

  public async getOrders(req: GetOrdersRequest, res: FastifyReply): Promise<void> {
    const { page } = req.query;

    const [orders, rows] = await Promise.all([
      this.orderService.getOrders(page),
      this.orderService.getOrdersCount(),
    ]);

    const logs = [orders.log, rows.log];

    const response: GetOrdersResponse = {
      page,
      pages: Math.ceil(rows.data / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows.data,
      stats: {
        queries: logs.length,
        log: logs,
      },
      orders: orders.data.map((order) => order.toAPI),
    };

    res.status(200).send(response);
  }

  public async getOrder(req: GetOrderRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const { data: order, log } = await this.orderService.getOrder(id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    const shipper: ShipperModel = order.getDataValue('shipper');
    const products: ProductModel[] = order.getDataValue('products');

    const response: GetOrderResponse = {
      stats: {
        queries: 1,
        log: [log],
      },
      order: {
        shipViaCompanyName: shipper.companyName,
        ...order.toAPI,
      },
      products: products.map((product) => {
        const orderDetailModel: OrderDetailModel = product.getDataValue('OrderDetailModel');

        return {
          orderID: orderDetailModel.orderID,
          quantity: orderDetailModel.quantity,
          orderUnitPrice: orderDetailModel.unitPrice,
          discount: orderDetailModel.discount,
          ...product.toAPI,
        };
      }),
    };

    res.status(200).send(response);
  }
}
