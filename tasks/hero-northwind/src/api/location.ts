import axios from 'axios';
import { Env } from '../env';

export class LocationAPI {
  public async getLocation(): Promise<GetLocationResponse> {
    return axios
      .get<GetLocationResponse>(`https://api.ip2loc.com/${Env.IP_LOC_API_KEY}/detect`)
      .then((res) => res.data);
  }
}

type GetLocationResponse = {
  time: { zone: string };
  location: {
    country: {
      eu_member: boolean;
      name: string;
      zip_code: string;
    };
    city: string;
    latitude: number;
    longitude: number;
  };
};
