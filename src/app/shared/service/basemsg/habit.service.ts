import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {HabitTemplate} from '../../../entity/HabitTemplate';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private httpsvr: HttpService) { }

  habitTemplateList = (queryParams: any): Observable<Array<HabitTemplate>> => {
    return this.httpsvr.onHttpGet('api/dic/habit/habitList', queryParams);
  }
  insertTemplateHabit = (habit: HabitTemplate): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habit/insertHabit', habit).pipe(
      map( re => re.result)
    );
  }
  updateTemplateHabit = (habit: HabitTemplate): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habit/updateHabit', habit).pipe(
      map( re => re.result)
    );
  }
  deleteTemplateHabit = (habit: HabitTemplate): Observable<string> => {
    return this.httpsvr.onHttpGet('api/dic/habit/deleteHabit', habit).pipe(
      map( re => re.result)
    );
  }
}
