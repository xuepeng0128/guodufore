import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Circle} from '../../../entity/Circle';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(private httpsvr: HttpService) { }

  allCircleList = (queryparams: any): Observable<{list: Array<Circle>, total: number}> => {
    return this.httpsvr.onHttpGet('/api/corp/basemsg/circle/allcircleList', queryparams);
  }
 schoolCircleList =(queryParams : any) : Observable<{list: Array<Circle>, total: number}> => {
   return this.httpsvr.onHttpGet('/api/corp/basemsg/circle/schoolCircleList', queryParams);
 }
  insertCircle = (circle: Circle): Observable<Circle> => {
    return this.httpsvr.onHttpPost('/api/school/buisness/circle/insertCircle', circle);
  }
  updateCircle = (circle: Circle): Observable<Circle> => {
    return this.httpsvr.onHttpPost('/api/school/buisness/circle/updateCircle', circle);
  }
  deleteCircle = (circle: Circle): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/school/buisness/circle/deleteCircle', circle);
  }


}
