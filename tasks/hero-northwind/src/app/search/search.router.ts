import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Customer } from '../customer/customer.router';
import { Product } from '../product/product.router';
import { SearchController } from './search.controller';

const searchController = new SearchController();

const SearchByNameOptions = {
  schema: {
    querystring: Type.Object({ q: Type.String(), table: Type.String() }),
  },
};

export async function searchRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/search', SearchByNameOptions, (req: SearchByNameRequest, res) =>
    searchController.searchByName(req, res),
  );
}

export type SearchByNameRequest = FastifyRequest<{
  Querystring: Static<typeof SearchByNameOptions['schema']['querystring']>;
}>;

export type SearchByNameResponse = {
  results: Array<Omit<Product, 'supplierName'> | Customer>;
};
