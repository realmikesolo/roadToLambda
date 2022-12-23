import { Env } from '../../env';
import SupplierModel from '../../models/supplier';

export class SupplierService {
  public async getSuppliers(page: number): Promise<SupplierModel[]> {
    return SupplierModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
    });
  }

  public async getSuppliersCount(): Promise<number> {
    return SupplierModel.count();
  }

  public async getSupplier(id: number): Promise<SupplierModel | null> {
    return SupplierModel.findByPk(id);
  }
}
