import { Log } from '../../db';
import { Env } from '../../env';
import ProductModel from '../../models/product';
import SupplierModel from '../../models/supplier';

export class ProductService {
  public async getProducts(page: number): Promise<{ data: ProductModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await ProductModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getProductsCount(): Promise<{ data: number; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await ProductModel.count({
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getProduct(id: number): Promise<{ data: ProductModel | null; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await ProductModel.findByPk(id, {
      include: [SupplierModel],
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }
}
