import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Habit} from '../../../entity/Habit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private httpsvr: HttpService) { }

  habitTemplateList = (queryParams: any): Observable<Array<Habit>> => {
    return this.httpsvr.onHttpGet('/api/dic/habittemplate/habitList', queryParams);
  }
  insertTemplateHabit = (habit: Habit): Observable<Habit> => {
    return this.httpsvr.onHttpPost('/api/dic/habittemplate/insertHabit', habit);
  }
  updateTemplateHabit = (habit: Habit): Observable<Habit> => {
    return this.httpsvr.onHttpPost('/api/dic/habittemplate/updateHabit', habit);
  }
  deleteTemplateHabit = (habit: Habit): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/dic/habittemplate/deleteHabit', habit);
  }
}
