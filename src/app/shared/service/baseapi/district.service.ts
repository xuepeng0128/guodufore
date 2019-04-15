import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {from, Observable, of} from 'rxjs';
import {District} from '../../../entity/District';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private httpsvr: HttpService) { }
  districtList = (): Observable<Array<District>> => {
     return this.httpsvr.onHttpGet('/api/dic/district/districtList', null);
  }

  singleDistrict = (districtId: string): Observable<District> => {
    return this.httpsvr.onHttpGet('/api/dic/district/singleDistrict', {districtId});
  }
  cityDistrictList = (): Observable<Array<{cityName: string , districts: Array<District>}>> => {
    return null;
    // return this.httpsvr.onHttpGet('/api/dic/district/districtList', null).pipe(
    //      flatMap((dlist: Array<District>) => from(dlist)),
    //     groupBy(
    //       p => p.city.cityName,
    //       p => JSON.stringify(p)
    //     ),
    //   flatMap((group$) =>
    //     group$.pipe(reduce((acc , cur) => [...acc, cur], [group$.key]))),
    //   map(  arrs => {
    //     const ret: Array<{cityName: string , districts: Array<District>}> = new Array<{cityName: string , districts: Array<District>}>();
    //     arrs.forEach( arr => {
    //               const districts: Array<District> = new Array<District>();
    //               const districtstr = arr.slice(1) as Array<string>;
    //               districtstr.forEach( str => {
    //                 districts.push(JSON.parse(str) as District);
    //               });
    //               ret.push({cityName : arr[0], districts});
    //     });
    //
    //     return ret;
    //   })
    // );
  }


}
