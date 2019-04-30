import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {CircleClass} from '../../../entity/CircleClass';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircleClassService {

  constructor(private httpsvr: HttpService) { }

  circleClassList = (): Observable<Array<CircleClass>> => {
    return this.httpsvr.onHttpGet('api/dic/circleclass/circleClassList', {});
  }
  insertCircleClass = (circleClass: CircleClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/circleclass/insertCircleClass', circleClass).pipe(
      map( re => re.result)
    );
  }
  updateCircleClass = (circleClass: CircleClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/circleclass/updateCircleClass', circleClass).pipe(
      map( re => re.result)
    );
  }

  deleteCircleClass = (circleClass: CircleClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/circleclass/deleteCircleClass', circleClass).pipe(
      map( re => re.result)
    );
  }


}
