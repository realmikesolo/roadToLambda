import { Log } from '../../db';
import { Env } from '../../env';
import CustomerModel from '../../models/customer';

export class CustomerService {
  public async getCustomers(page: number): Promise<{ data: CustomerModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await CustomerModel.findAll({
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

  public async getCustomersCount(): Promise<{ data: number; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await CustomerModel.count({
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async getCustomer(id: string): Promise<{ data: CustomerModel | null; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await CustomerModel.findByPk(id, {
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }
}
