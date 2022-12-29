import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance, FastifyRequest } from 'fastify';
import ProductModel from '../../models/product';
import { ProductController } from './product.controller';

const productController = new ProductController();

const GetProductsOptions = {
  schema: {
    querystring: Type.Object({ page: Type.Number() }),
  },
};

const GetProductOptions = {
  schema: {
    querystring: Type.Object({ id: Type.Number() }),
  },
};

export async function productRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/products', GetProductsOptions, (req: GetProductsRequest, res) =>
    productController.getProducts(req, res),
  );

  fastify.get('/product', GetProductOptions, (req: GetProductRequest, res) =>
    productController.getProduct(req, res),
  );
}

export type GetProductRequest = FastifyRequest<{
  Querystring: Static<typeof GetProductOptions['schema']['querystring']>;
}>;

export type GetProductsRequest = FastifyRequest<{
  Querystring: Static<typeof GetProductsOptions['schema']['querystring']>;
}>;

export type GetProductResponse = {
  product: Product;
};

export type GetProductsResponse = {
  page: number;
  pages: number;
  items: number;
  total: number;
  products: Array<Omit<Product, 'supplierName'>>;
};

export type Product = Pick<
  ProductModel,
  | 'productID'
  | 'productName'
  | 'supplierID'
  | 'categoryID'
  | 'quantityPerUnit'
  | 'unitPrice'
  | 'unitsInStock'
  | 'unitsOnOrder'
  | 'reorderLevel'
  | 'discontinued'
> & { supplierName: string };
