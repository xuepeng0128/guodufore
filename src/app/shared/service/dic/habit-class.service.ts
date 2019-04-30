import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {HabitClass} from '../../../entity/HabitClass';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitClassService {
  constructor(private httpsvr: HttpService) { }

  habitClassList = (): Observable<Array<HabitClass>> => {
    return this.httpsvr.onHttpGet('api/dic/habitclass/habitClassList', {});
  }
  insertHabitClass = (habitClass: HabitClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habitclass/insertHabitClass', habitClass).pipe(
      map( re => re.result)
    );
  }
  updateHabitClass = (habitClass: HabitClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habitclass/updateHabitClass', habitClass).pipe(
      map( re => re.result)
    );
  }

  deleteHabitClass = (habitClass: HabitClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habitclass/deleteHabitClass', habitClass).pipe(
      map( re => re.result)
    );
  }
}
