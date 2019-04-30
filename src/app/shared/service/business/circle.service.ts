import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Circle} from '../../../entity/Circle';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(private httpsvr: HttpService) { }

  allCircleList = (queryparams: any): Observable<{list: Array<Circle>, total: number}> => {
    return this.httpsvr.onHttpGet('api/buisness/circle/circleList', queryparams);
  }
 schoolCircleList =(queryParams : any) : Observable<{list: Array<Circle>, total: number}> => {
   return this.httpsvr.onHttpGet('api/buisness/circle/schoolCircleList', queryParams);
 }
  insertCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpPost('api/buisness/circle/insertCircle', circle).pipe(
      map( re => re.result)
    );
  }
  updateCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpPost('api/school/buisness/circle/updateCircle', circle).pipe(
      map( re => re.result)
    );
  }
  deleteCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpGet('api/school/buisness/circle/deleteCircle', circle).pipe(
      map( re => re.result)
    );
  }


}
