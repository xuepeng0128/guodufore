import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {ITeacherQueryParams} from '../../interface/queryparams/ITeacherQueryParams';
import {ITeacherQueryResult} from '../../interface/queryparams/ITeacherQueryResult';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpsvr: HttpService) { }

  teacherList = (queryParams: ITeacherQueryParams): Observable<Array<ITeacherQueryResult>> => {
    return this.httpsvr.onHttpGet('/api/basemsg/teacher/teacherList', queryParams);
  }
 teacherListTotal = (queryParams: ITeacherQueryParams): Observable<number> => {
   return this.httpsvr.onHttpGet('/api/basemsg/teacher/teacherListTotal', queryParams);
 }

 onGroupSaveTeacher = (teachers: Array<Teacher>): Observable<string> => {
   return  this.httpsvr.onHttpPost('/api/basemsg/teacher/teacherExcel', teachers);
 }


  /**
   * 导出
   */
  onExport = (queryParams: any): Observable<string> => {
    return  this.httpsvr.onHttpGet('/api/basemsg/teacher/teacherExcel', queryParams);
  }

}
