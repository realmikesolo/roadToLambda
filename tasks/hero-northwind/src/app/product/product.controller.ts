import { FastifyReply } from 'fastify';
import { Env } from '../../env';
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
      products: products.map((product) => {
        product = product.toJSON();

        return {
          productID: product.productID,
          productName: product.productName,
          supplierID: product.supplierID,
          categoryID: product.categoryID,
          quantityPerUnit: product.quantityPerUnit,
          unitPrice: product.unitPrice,
          unitsInStock: product.unitsInStock,
          unitsOnOrder: product.unitsOnOrder,
          reorderLevel: product.reorderLevel,
          discontinued: product.discontinued,
        };
      }),
    };

    res.status(200).send(response);
  }

  public async getProduct(req: GetProductRequest, res: FastifyReply): Promise<void> {
    const { id } = req.query;

    const product = await this.productService.getProduct(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    const productJSON = product.toJSON();

    const response: GetProductResponse = {
      product: {
        productID: productJSON.productID,
        productName: productJSON.productName,
        supplierID: productJSON.supplierID,
        categoryID: productJSON.categoryID,
        quantityPerUnit: productJSON.quantityPerUnit,
        unitPrice: productJSON.unitPrice,
        unitsInStock: productJSON.unitsInStock,
        unitsOnOrder: productJSON.unitsOnOrder,
        reorderLevel: productJSON.reorderLevel,
        discontinued: productJSON.discontinued,
        supplierName: productJSON.supplier.companyName,
      },
    };

    res.status(200).send(response);
  }
}
