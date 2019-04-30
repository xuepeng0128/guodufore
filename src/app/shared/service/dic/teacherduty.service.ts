import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {TeacherDuty} from '../../../entity/TeacherDuty';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherdutyService {

  constructor(private httpsvr: HttpService) { }

  teacherDutyList = (): Observable<Array<TeacherDuty>> => {
    return this.httpsvr.onHttpGet('api/dic/teacherduty/teacherDutyList', {});
  }
  insertTeacherDuty = (teacherDuty: TeacherDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/teacherduty/insertTeacherDuty', teacherDuty).pipe(
      map( re => re.result)
    );
  }
  updateTeacherDuty = (teacherDuty: TeacherDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/teacherduty/updateTeacherDuty', teacherDuty).pipe(
      map( re => re.result)
    );
  }

  deleteTeacherDuty = (teacherDuty: TeacherDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/teacherduty/deleteTeacherDuty', teacherDuty).pipe(
      map( re => re.result)
    );
  }



}
