import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {TeacherDuty} from '../../../entity/TeacherDuty';

@Injectable({
  providedIn: 'root'
})
export class TeacherdutyService {

  constructor(private httpsvr: HttpService) { }

  teacherDutyList = (): Observable<Array<TeacherDuty>> => {
    return this.httpsvr.onHttpGet('/api/dic/teacherduty/teacherDutyList', {});
  }
  insertTeacherDuty = (teacherDuty: TeacherDuty): Observable<TeacherDuty> => {
    return this.httpsvr.onHttpPost('/api/dic/teacherduty/insertTeacherDuty', teacherDuty);
  }
  updateTeacherDuty = (teacherDuty: TeacherDuty): Observable<TeacherDuty> => {
    return this.httpsvr.onHttpPost('/api/dic/teacherduty/updateTeacherDuty', teacherDuty);
  }

  deleteTeacherDuty = (teacherDuty: TeacherDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/teacherduty/deleteTeacherDuty', teacherDuty);
  }



}
