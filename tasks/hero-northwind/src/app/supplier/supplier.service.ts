import { Log } from '../../db';
import { Env } from '../../env';
import SupplierModel from '../../models/supplier';

export class SupplierService {
  public async getSuppliers(page: number): Promise<{ data: SupplierModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await SupplierModel.findAll({
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

  public async getSuppliersCount(): Promise<{ data: number; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await SupplierModel.count({
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getSupplier(id: number): Promise<{ data: SupplierModel | null; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await SupplierModel.findByPk(id, {
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }
}
