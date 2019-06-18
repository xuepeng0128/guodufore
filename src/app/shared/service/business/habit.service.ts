import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {IHabitQueryParams} from '../../interface/queryparams/IHabitQueryParams';
import {Observable} from 'rxjs';
import {Habit} from '../../../entity/Habit';
import {map} from 'rxjs/operators';
import {HabitExam} from '../../../entity/HabitExam';
import {Student} from "../../../entity/Student";

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

  habitExamByHabitId =(habitId : string ): Observable<HabitExam> =>{
         return this.httpsvr.onHttpGet('api/business/habit/habitExamByHabitId', {habitId}).pipe(
               map( re => (re as Array<HabitExam>).length ===0 ? null : re[0]  )
         );
  }
  examHabits =(habitExamId : string) : Observable<Array<Habit>> =>{
       return  this.httpsvr.onHttpGet('api/business/habit/examHabits', {habitExamId});
  }

getHabitStudents =(habitId : string ,schoolId : string) : Observable<Array<Student>> =>{

  return this.httpsvr.onHttpGet('api/business/habit/habitStudents', {habitId,schoolId});
}


  habitStudentPutCards=(habitId:string ): Observable<Array<any>> => {
     return this.httpsvr.onHttpGet('api/business/habit/habitStudentPutCards', {habitId,pageSize : '1000',pageNo :'1'});
  }

  currentStudentPutCardList=(habitId:string,studentId : string  ): Observable<Array<any>> => {
    return this.httpsvr.onHttpGet('api/business/habit/currentStudentPutCardList', {habitId,studentId,pageSize : '1000',pageNo :'1'});
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
