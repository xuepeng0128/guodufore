import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {HabitClass} from "../../../entity/HabitClass";

@Injectable({
  providedIn: 'root'
})
export class HabitClassService {
  constructor(private httpsvr: HttpService) { }

  HabitClassList = (): Observable<Array<HabitClass>> => {
    return this.httpsvr.onHttpGet('/api/dic/habitclass/habitClassList', {});
  }
  insertHabitClass = (habitClass: HabitClass): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/habitclass/insertHabitClass',habitClass);
  }
  updateHabitClass = (habitClass: HabitClass): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/habitclass/updateHabitClass', habitClass);
  }

  deleteHabitClass = (habitClass: HabitClass): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/habitclass/deleteHabitClass', habitClass);
  }
}
