import { FastifyInstance } from 'fastify';
import { LocationController } from './location.controller';

const locationController = new LocationController();

export async function locationRouter(fastify: FastifyInstance): Promise<void> {
  fastify.get('/api/status', (req, res) => locationController.getStatus(req, res));
}

export type GetStatusResponse = {
  country: string;
  city: string;
  isEuCountry: boolean;
  postalCode: string;
  timezone: string;
  latitude: number;
  longitude: number;
  colo: string;
};
