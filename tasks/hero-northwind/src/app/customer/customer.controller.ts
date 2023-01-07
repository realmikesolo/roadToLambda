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

    const logs = [customers.log, rows.log];

    const response: GetCustomersResponse = {
      page,
      pages: Math.ceil(rows.data / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows.data,
      stats: {
        queries: logs.length,
        log: logs,
      },
      customers: customers.data.map((customer) => customer.toAPI),
    };

    res.status(200).send(response);
  }

  public async getCustomer(req: GetCustomerRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const { data: customer, log } = await this.customerService.getCustomer(id);
    if (!customer) {
      return res.status(404).send({ message: 'Customer not found' });
    }

    const response: GetCustomerResponse = {
      stats: {
        queries: 1,
        log: [log],
      },
      customer: customer.toAPI,
    };

    res.status(200).send(response);
  }
}
