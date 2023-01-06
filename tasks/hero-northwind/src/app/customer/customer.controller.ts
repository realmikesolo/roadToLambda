import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import {
  GetCustomerRequest,
  GetCustomerResponse,
  GetCustomersRequest,
  GetCustomersResponse,
} from './customer.router';
import { CustomerService } from './customer.service';

export class CustomerController {
  private readonly customerService = new CustomerService();

  public async getCustomers(req: GetCustomersRequest, res: FastifyReply): Promise<void> {
    const { page } = req.query;

    const [customers, rows] = await Promise.all([
      this.customerService.getCustomers(page),
      this.customerService.getCustomersCount(),
    ]);

    const response: GetCustomersResponse = {
      page,
      pages: Math.ceil(rows / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows,
      customers: customers.map((customer) => customer.toAPI),
    };

    res.status(200).send(response);
  }

  public async getCustomer(req: GetCustomerRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const customer = await this.customerService.getCustomer(id);
    if (!customer) {
      return res.status(404).send({ message: 'Customer not found' });
    }

    const response: GetCustomerResponse = {
      customer: customer.toAPI,
    };

    res.status(200).send(response);
  }
}
