import {District} from './District';

export class City {
    cityId: string;
    cityName: string;
    districts: Array<District> = null;
  constructor(cityId: string, cityName: string) {
    this.cityId = cityId;
    this.cityName = cityName;
  }
}
