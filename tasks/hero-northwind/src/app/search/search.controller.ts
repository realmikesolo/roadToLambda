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
          results: products.map((product) => product.toAPI),
        };

        res.status(200).send(response);
        break;
      }
      case 'customers': {
        const customers = await this.searchService.searchCustomers(q);

        response = {
          results: customers.map((customer) => customer.toAPI),
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
