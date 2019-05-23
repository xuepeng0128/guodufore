import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {IHabitQueryParams} from '../../interface/queryparams/IHabitQueryParams';
import {Observable} from 'rxjs';
import {Habit} from '../../../entity/Habit';
import {map} from 'rxjs/operators';
import {HabitExam} from '../../../entity/HabitExam';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private httpsvr: HttpService) { }

  habitList = (queryparams: IHabitQueryParams): Observable<Array<Habit>> => {
       return this.httpsvr.onHttpGet('api/business/habit/habitList', queryparams);
  }
  habitListTotal = (queryparams: IHabitQueryParams): Observable<number> => {
    return this.httpsvr.onHttpGet('api/business/habit/habitListTotal', queryparams).pipe(
      map( re => parseInt( re.total , 10) )
    );
  }

  insertExamHabit = (insertExamHabitParams: {habitExam: HabitExam, habits: Array<Habit>, studentIds: Array<string>}): Observable<string> => {
         return this.httpsvr.onHttpPost('api/business/habit/insertExamHabit', insertExamHabitParams).pipe(
           map( re => re.result)
         );
  }

  insertNoExamHabit = (insertExamHabitParams: {habitExam: HabitExam, habits: Array<Habit>, studentIds: Array<string>}): Observable<string> => {
    return this.httpsvr.onHttpPost('api/business/habit/insertNoExamHabit', insertExamHabitParams).pipe(
      map( re => re.result)
    );
  }


  onMakeExamId = () => {
    const t = new Date().getTime();
    return 'HEXAM' + t;
  }

onMakeHabitId=() =>{
  const t = new Date().getTime();
  return 'HAB' + t;
}

}
