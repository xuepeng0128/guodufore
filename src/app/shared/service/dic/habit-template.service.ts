import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {HabitTemplate} from '../../../entity/HabitTemplate';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitTemplateService {

  constructor(private httpsvr: HttpService) { }

  habitTemplateList = (pageBegin: number, pageSize: number): Observable<Array<HabitTemplate>> => {
      return this.httpsvr.onHttpGet('api/dic/habittemplate/habitTemplateList', {pageBegin, pageSize});
  }
habitTemplateListTotal = (): Observable<number> => {
    return this.httpsvr.onHttpGet('api/dic/habittemplate/habitTemplateListTotal', {}).pipe(
       map(re =>  parseInt( re.total , 10) )
    );
}
  insertHabitTemplate = ( habitTemplate: HabitTemplate): Observable<string> => {
     return this.httpsvr.onHttpPost('api/dic/habittemplate/insertHabitTemplate', habitTemplate).pipe(
       map( re => re.result)
     );
  }

  updateHabitTemplate = ( habitTemplate: HabitTemplate): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/habittemplate/updatehabitTemplate', habitTemplate).pipe(
      map( re => re.result)
    );
  }
  deleteHabitTemplate = (habitTemplateId: string): Observable<string> => {
    return this.httpsvr.onHttpGet('api/dic/habittemplate/deleteHabitTemplate', {habitTemplateId}).pipe(
      map(re => re.result)
    );
  }


}
