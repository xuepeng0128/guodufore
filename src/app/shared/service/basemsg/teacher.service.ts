import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {ITeacherQueryParams} from '../../interface/queryparams/ITeacherQueryParams';
import {ITeacherQueryResult} from '../../interface/queryparams/ITeacherQueryResult';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpsvr: HttpService) { }

  teacherList = (queryParams: ITeacherQueryParams): Observable<Array<ITeacherQueryResult>> => {
    return this.httpsvr.onHttpGet('api/basemsg/teacher/teacherList', queryParams);
  }
 teacherListTotal = (queryParams: ITeacherQueryParams): Observable<number> => {
   return this.httpsvr.onHttpGet('api/basemsg/teacher/teacherListTotal', queryParams).pipe(
      map( re => re.total)
   );
 }
insertTeacher = (teacher: Teacher): Observable<string> => {
  return  this.httpsvr.onHttpPost('api/basemsg/teacher/insertTeacher', teacher).pipe(
    map( re => re.result)
  );
}

updateTeacher = (teacher: Teacher): Observable<string> => {
  return  this.httpsvr.onHttpPost('api/basemsg/teacher/updateTeacher', teacher).pipe(
    map( re => re.result)
  );
}
deleteTeacher = (teacherId: string): Observable<string> => {
  return  this.httpsvr.onHttpPost('api/basemsg/teacher/deleteTeacher', {teacherId}).pipe(
    map( re => re.result)
  );
}
  onQuitDuty = (teacherId: string): Observable<string> => {
    return  this.httpsvr.onHttpPost('api/basemsg/teacher/quitDutyTeacher', {teacherId}).pipe(
      map( re => re.result)
    );
  }




 onGroupSaveTeacher = (teachers: Array<Teacher>): Observable<string> => {
   return  this.httpsvr.onHttpPost('api/basemsg/teacher/groupInsertTeachers', teachers).pipe(
       map( re => re.result)
   );
 }





  /**
   * 导出
   */
  onExport = (queryParams: any): Observable<string> => {
    return  this.httpsvr.onHttpGet('api/basemsg/teacher/teacherExcel', queryParams);
  }

}
