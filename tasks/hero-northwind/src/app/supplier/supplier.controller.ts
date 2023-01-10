import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import {
  GetSupplierRequest,
  GetSupplierResponse,
  GetSuppliersRequest,
  GetSuppliersResponse,
} from './supplier.router';
import { SupplierService } from './supplier.service';

export class SupplierController {
  private readonly supplierService = new SupplierService();

  public async getSuppliers(req: GetSuppliersRequest, res: FastifyReply): Promise<void> {
    const { page } = req.query;

    const [suppliers, rows] = await Promise.all([
      this.supplierService.getSuppliers(page),
      this.supplierService.getSuppliersCount(),
    ]);

    const logs = [suppliers.log, rows.log];

    const response: GetSuppliersResponse = {
      page,
      pages: Math.ceil(rows.data / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows.data,
      stats: {
        queries: logs.length,
        log: logs,
      },
      suppliers: suppliers.data.map((supplier) => supplier.toAPI),
    };

    res.status(200).send(response);
  }

  public async getSupplier(req: GetSupplierRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const { data: supplier, log } = await this.supplierService.getSupplier(id);
    if (!supplier) {
      return res.status(404).send({ message: 'Supplier not found' });
    }

    const response: GetSupplierResponse = {
      stats: {
        queries: 1,
        log: [log],
      },
      supplier: supplier.toAPI,
    };

    res.status(200).send(response);
  }
}
