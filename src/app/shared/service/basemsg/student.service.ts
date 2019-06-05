import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {IStudentQueryResult} from '../../interface/queryparams/IStudentQueryResult';
import {IStudentQueryParams} from '../../interface/queryparams/IStudentQueryParams';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpsvr: HttpService) { }
  // 学生列表
  studentList = (queryparams: IStudentQueryParams): Observable<Array<IStudentQueryResult>> => {
     return this.httpsvr.onHttpGet('api/basemsg/student/studentList', queryparams);
  }

  studentListTotal = (queryparams: IStudentQueryParams): Observable<number> => {
    return this.httpsvr.onHttpGet('api/basemsg/student/studentListTotal', queryparams);
  }




}
