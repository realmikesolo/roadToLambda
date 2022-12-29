import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import OrderDetailModel from '../../models/orderDetail';
import ProductModel from '../../models/product';
import ShipperModel from '../../models/shippers';
import { GetOrderRequest, GetOrdersRequest, GetOrdersResponse } from './order.router';
import { OrderService } from './order.service';

export class OrderController {
  private readonly orderService = new OrderService();

  public async getOrders(req: GetOrdersRequest, res): Promise<void> {
    const { page } = req.query;

    const [orders, rows] = await Promise.all([
      this.orderService.getOrders(page),
      this.orderService.getOrdersCount(),
    ]);

    const response: GetOrdersResponse = {
      page,
      pages: Math.ceil(rows / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows,
      orders: orders.map((order) => {
        return {
          totalProductsDiscount: order.totalProductsDiscount!,
          totalProductsPrice: order.totalProductsPrice!,
          totalProductsItems: order.totalProductsItems!,
          totalProducts: order.totalProducts!,
          orderID: order.orderID,
          customerID: order.customerID,
          employeeID: order.employeeID,
          orderDate: order.orderDate,
          requiredDate: order.requiredDate,
          shippedDate: order.shippedDate,
          shipVia: order.shipVia,
          freight: order.freight,
          shipName: order.shipName,
          shipAddress: order.shipAddress,
          shipCity: order.shipCity,
          shipRegion: order.shipRegion,
          shipPostalCode: order.shipPostalCode,
          shipCountry: order.shipCountry,
        };
      }),
    };

    res.status(200).send(response);
  }

  public async getOrder(req: GetOrderRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const order = await this.orderService.getOrder(id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    const shipper: ShipperModel = order.getDataValue('shipper');
    const products: ProductModel[] = order.getDataValue('products');

    const response = {
      order: {
        shipViaCompanyName: shipper.companyName,
        totalProductsDiscount: order.totalProductsDiscount!,
        totalProductsPrice: order.totalProductsPrice!,
        totalProductsItems: order.totalProductsItems!,
        totalProducts: order.totalProducts!,
        orderID: order.orderID,
        customerID: order.customerID,
        employeeID: order.employeeID,
        orderDate: order.orderDate,
        requiredDate: order.requiredDate,
        shippedDate: order.shippedDate,
        shipVia: order.shipVia,
        freight: order.freight,
        shipName: order.shipName,
        shipAddress: order.shipAddress,
        shipCity: order.shipCity,
        shipRegion: order.shipRegion,
        shipPostalCode: order.shipPostalCode,
        shipCountry: order.shipCountry,
      },
      products: products.map((product) => {
        const orderDetailModel: OrderDetailModel = product.getDataValue('OrderDetailModel');

        return {
          orderID: orderDetailModel.orderID,
          quantity: orderDetailModel.quantity,
          orderUnitPrice: orderDetailModel.unitPrice,
          discount: orderDetailModel.discount,
          productID: product.productID,
          productName: product.productName,
          supplierID: product.supplierID,
          categoryID: product.categoryID,
          quantityPerUnit: product.quantityPerUnit,
          productUnitPrice: product.unitPrice,
          unitsInStock: product.unitsInStock,
          unitsOnOrder: product.unitsOnOrder,
          reorderLevel: product.reorderLevel,
          discontinued: product.discontinued,
        };
      }),
    };

    res.status(200).send(response);
  }
}
