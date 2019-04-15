import {City} from './City';

export class District {
  districtId: string;
  districtName: string;
  city: City;

  constructor(options: {districtId?: string, districtName?: string, city?: City} = {}) {
    this.districtId = options.districtId || '';
    this.districtName = options.districtName || '';
    this.city = options.city;
  }
}
