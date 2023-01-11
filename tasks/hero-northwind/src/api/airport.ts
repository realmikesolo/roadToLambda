import axios from 'axios';
import { Env } from '../env';

export class AirportAPI {
  public async getAirports(options: {
    latitude: number;
    longitude: number;
  }): Promise<GetAirportsResponse['response']['airports']> {
    return axios
      .get<GetAirportsResponse>(
        `https://airlabs.co/api/v9/nearby?lat=${options.latitude}&lng=${options.longitude}&distance=${Env.AIRPORT_DISTANCE}&api_key=${Env.AIR_LABS_API_KEY}`,
      )
      .then((res) => res.data.response.airports);
  }
}

export type GetAirportsResponse = {
  response: {
    airports: Array<{
      name: string;
      iata_code: string;
      icao_code: string;
      lat: number;
      lng: number;
      country_code: string;
      popularity: number;
      distance: number;
    }>;
  };
};
