import { SupplierController } from './supplier.controller';
import { Static, Type } from '@sinclair/typebox';
import SupplierModel from '../../models/supplier';
import { FastifyInstance, FastifyRequest } from 'fastify';

const supplierController = new SupplierController();

const GetSuppliersOptions = {
  schema: {
    querystring: Type.Object({ page: Type.Number() }),
  },
};

const GetSupplierOptions = {
  schema: {
    querystring: Type.Object({ id: Type.Number() }),
  },
};

export async function supplierRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/suppliers', GetSuppliersOptions, (req: GetSuppliersRequest, res) =>
    supplierController.getSuppliers(req, res),
  );

  fastify.get('/supplier', GetSupplierOptions, (req: GetSupplierRequest, res) =>
    supplierController.getSupplier(req, res),
  );
}

export type GetSuppliersRequest = FastifyRequest<{
  Querystring: Static<typeof GetSuppliersOptions['schema']['querystring']>;
}>;

export type GetSupplierRequest = FastifyRequest<{
  Querystring: Static<typeof GetSupplierOptions['schema']['querystring']>;
}>;

export type GetSuppliersResponse = {
  page: number;
  pages: number;
  items: number;
  total: number;
  suppliers: SupplierModel[];
};

export type GetSupplierResponse = {
  supplier: SupplierModel;
};
