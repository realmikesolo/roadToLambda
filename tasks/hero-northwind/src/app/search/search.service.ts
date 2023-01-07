import { Op } from 'sequelize';
import { Log } from '../../db';
import CustomerModel from '../../models/customer';
import ProductModel from '../../models/product';

export class SearchService {
  public async searchProducts(name: string): Promise<{ data: ProductModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await ProductModel.findAll({
      where: {
        productName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }

  public async searchCustomers(name: string): Promise<{ data: CustomerModel[]; log: Log }> {
    let query!: string;
    let duration!: number;

    const data = await CustomerModel.findAll({
      benchmark: true,
      logging: (req: string, ms: number) => {
        query = req;
        duration = ms;
      },
      where: {
        [Op.or]: [
          {
            companyName: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            contactName: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            contactTitle: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            address: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
    });

    return { data, log: { query, duration: `${duration}ms`, ts: new Date().toISOString() } };
  }
}
