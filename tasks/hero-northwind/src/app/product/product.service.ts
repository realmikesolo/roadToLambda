import { Env } from '../../env';
import ProductModel from '../../models/product';
import SupplierModel from '../../models/supplier';

export class ProductService {
  public async getProducts(page: number): Promise<ProductModel[]> {
    return ProductModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
    });
  }

  public async getProductsCount(): Promise<number> {
    return ProductModel.count();
  }

  public async getProduct(id: number): Promise<ProductModel | null> {
    return ProductModel.findByPk(id, {
      include: [SupplierModel],
    });
  }
}
