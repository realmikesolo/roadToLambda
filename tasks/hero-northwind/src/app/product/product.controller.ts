import { FastifyReply } from 'fastify';
import { Env } from '../../env';
import SupplierModel from '../../models/supplier';
import {
  GetProductRequest,
  GetProductResponse,
  GetProductsRequest,
  GetProductsResponse,
} from './product.router';
import { ProductService } from './product.service';

export class ProductController {
  private readonly productService = new ProductService();

  public async getProducts(req: GetProductsRequest, res: FastifyReply): Promise<void> {
    const { page } = req.query;

    const [products, rows] = await Promise.all([
      this.productService.getProducts(page),
      this.productService.getProductsCount(),
    ]);

    const response: GetProductsResponse = {
      page,
      pages: Math.ceil(rows / Env.PAGE_LIMIT),
      items: Env.PAGE_LIMIT,
      total: rows,
      products: products.map((product) => product.toAPI),
    };

    res.status(200).send(response);
  }

  public async getProduct(req: GetProductRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const product = await this.productService.getProduct(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const supplier: SupplierModel = product.getDataValue('supplier');

    const response: GetProductResponse = {
      product: {
        ...product.toAPI,
        supplierName: supplier.companyName,
      },
    };

    res.status(200).send(response);
  }
}
