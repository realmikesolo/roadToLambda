import { Env } from '../../env';
import CustomerModel from '../../models/customer';

export class CustomerService {
  public async getCustomers(page: number): Promise<CustomerModel[]> {
    return CustomerModel.findAll({
      limit: Env.PAGE_LIMIT,
      offset: (page - 1) * Env.PAGE_LIMIT,
    });
  }

  public async getCustomersCount(): Promise<number> {
    return CustomerModel.count();
  }

  public async getCustomer(id: string): Promise<CustomerModel | null> {
    return CustomerModel.findByPk(id);
  }
}
