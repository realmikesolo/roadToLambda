import OrderModel from '../../models/order';
import ProductModel from '../../models/product';
import ShipperModel from '../../models/shippers';
import { db } from '../../../src/db';
import { Env } from '../../env';

export class OrderService {
  public async getOrders(page: number): Promise<OrderModel[]> {
    return OrderModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
      attributes: {
        include: [
          [
            db.literal(
              `(SELECT SUM("OrderDetails"."unitPrice" * "OrderDetails"."discount" * "OrderDetails"."quantity") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProductsDiscount',
          ],
          [
            db.literal(
              `(SELECT SUM("OrderDetails"."unitPrice" * "OrderDetails"."quantity") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProductsPrice',
          ],
          [
            db.literal(
              `(SELECT SUM("OrderDetails"."quantity") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProductsItems',
          ],
          [
            db.literal(
              `(SELECT COUNT("OrderDetails"."orderID") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProducts',
          ],
        ],
      },
    });
  }

  public async getOrdersCount(): Promise<number> {
    return OrderModel.count();
  }

  public async getOrder(id: number): Promise<OrderModel | null> {
    return OrderModel.findByPk(id, {
      include: [
        { model: ShipperModel, attributes: ['companyName'] },
        {
          model: ProductModel,
        },
      ],
      attributes: {
        include: [
          [
            db.literal(
              `(SELECT SUM("OrderDetails"."unitPrice" * "OrderDetails"."discount" * "OrderDetails"."quantity") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProductsDiscount',
          ],
          [
            db.literal(
              `(SELECT SUM("OrderDetails"."unitPrice" * "OrderDetails"."quantity") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProductsPrice',
          ],
          [
            db.literal(
              `(SELECT SUM("OrderDetails"."quantity") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProductsItems',
          ],
          [
            db.literal(
              `(SELECT COUNT("OrderDetails"."orderID") FROM "OrderDetails" WHERE "OrderDetails"."orderID" = "OrderModel"."orderID")`,
            ),
            'totalProducts',
          ],
        ],
      },
    });
  }
}
