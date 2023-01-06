import { Op } from 'sequelize';
import CustomerModel from '../../models/customer';
import ProductModel from '../../models/product';

export class SearchService {
  public async searchProducts(name: string): Promise<ProductModel[]> {
    return ProductModel.findAll({
      where: {
        productName: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }

  public async searchCustomers(name: string): Promise<CustomerModel[]> {
    return CustomerModel.findAll({
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
  }
}
