import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CorpDuty} from '../../../entity/CorpDuty';
import {HttpService} from '../baseapi/http.service';
import {District} from '../../../entity/District';
import {User} from '../../../entity/User';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  STORAGE_KEY = '_district';
  constructor(private httpsvr: HttpService) { }
  corpDistrictList = (): Observable<Array<District>> => {
    return this.httpsvr.onHttpGet('/api/dic/district/districtList', {});
  }

  getDistrictsStorage = (): Array<District> => {
    const districts = sessionStorage.getItem(this.STORAGE_KEY);
    if (districts) {
      return JSON.parse(districts) as Array<District>;
    }
    return null;
  }
  setDistrictsStorage = (districtArray: Array<District>) => {
    if (districtArray) {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(districtArray));
    }
  }




}
