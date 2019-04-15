import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Student} from '../../../entity/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpsvr: HttpService) { }
  // 学生列表
  studentList = (queryparams: any): Observable<{list: Array<Student>, total: number}> => {
     return this.httpsvr.onHttpGet('/api/corp/basemsg/student/studentList', queryparams);
  }



}
