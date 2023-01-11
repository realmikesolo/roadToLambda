import { FastifyReply, FastifyRequest } from 'fastify';
import { AirportAPI } from '../../api/airport';
import { LocationAPI } from '../../api/location';
import { GetStatusResponse } from './location.router';

export class LocationController {
  private readonly locationAPI = new LocationAPI();
  private readonly airportAPI = new AirportAPI();

  public async getStatus(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const { location, time } = await this.locationAPI.getLocation();
    const airports = await this.airportAPI.getAirports(location);

    const response: GetStatusResponse = {
      country: location.country.name,
      city: location.city,
      isEuCountry: location.country.eu_member,
      postalCode: location.country.zip_code,
      timezone: time.zone,
      latitude: location.latitude,
      longitude: location.longitude,
      colo: airports.reduce((acc, airport) =>
        acc.distance < airport.distance && acc.popularity > airport.popularity ? acc : airport,
      ).iata_code,
    };

    res.status(200).send(response);
  }
}
