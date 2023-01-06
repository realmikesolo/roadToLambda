import { Op } from 'sequelize';
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
}
