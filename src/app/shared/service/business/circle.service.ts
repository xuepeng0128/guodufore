import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Circle} from '../../../entity/Circle';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ICircleQueryParams} from '../../interface/queryparams/ICircleQueryParams';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(private httpsvr: HttpService) { }

  circleList = (queryparams: ICircleQueryParams): Observable<Array<Circle>> => {
    return this.httpsvr.onHttpGet('api/business/circle/circleList', queryparams);
  }

  insertCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpPost('api/business/circle/insertCircle', circle).pipe(
      map( re => re.result)
    );
  }
  updateCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpPost('api/business/circle/updateCircle', circle).pipe(
      map( re => re.result)
    );
  }
  deleteCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpGet('api/business/circle/deleteCircle', circle).pipe(
      map( re => re.result)
    );
  }
 closeCircle = (closeMan: string , closeReason: string ): Observable<string > => {
   return this.httpsvr.onHttpGet('api/business/circle/closeCircle', {closeMan, closeReason}).pipe(
     map( re => re.result)
   );
 }

}
