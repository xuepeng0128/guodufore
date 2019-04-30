import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Habit} from '../../../entity/Habit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private httpsvr: HttpService) { }

  habitTemplateList = (queryParams: any): Observable<Array<Habit>> => {
    return this.httpsvr.onHttpGet('api/dic/habit/habitList', queryParams);
  }
  insertTemplateHabit = (habit: Habit): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habit/insertHabit', habit).pipe(
      map( re => re.result)
    );
  }
  updateTemplateHabit = (habit: Habit): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habit/updateHabit', habit).pipe(
      map( re => re.result)
    );
  }
  deleteTemplateHabit = (habit: Habit): Observable<string> => {
    return this.httpsvr.onHttpGet('api/dic/habit/deleteHabit', habit).pipe(
      map( re => re.result)
    );
  }
}
