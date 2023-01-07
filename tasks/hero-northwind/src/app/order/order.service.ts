import OrderModel from '../../models/order';
import ProductModel from '../../models/product';
import ShipperModel from '../../models/shippers';
import { db, Log } from '../../../src/db';
import { Env } from '../../env';

export class OrderService {
  public async getOrders(page: number): Promise<{ data: OrderModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await OrderModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
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

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getOrdersCount(): Promise<{ data: number; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await OrderModel.count({
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getOrder(id: number): Promise<{ data: OrderModel | null; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await OrderModel.findByPk(id, {
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
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

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }
}
