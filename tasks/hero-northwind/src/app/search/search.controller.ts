import { FastifyReply } from 'fastify';
import { SearchByNameRequest, SearchByNameResponse } from './search.router';
import { SearchService } from './search.service';

export class SearchController {
  private readonly searchService = new SearchService();

  public async searchByName(req: SearchByNameRequest, res: FastifyReply): Promise<void> {
    const { q, table } = req.query;

    let response: SearchByNameResponse;

    switch (table) {
      case 'products': {
        const products = await this.searchService.searchProducts(q);

        response = {
          results: products.map((product) => {
            return {
              // TODO: duplicate in ProductController
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
        break;
      }

      default: {
        res.status(404).send({ message: `Search is forbidden for ${table}` });
      }
    }
  }
}
