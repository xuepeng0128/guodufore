import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Student} from '../../../entity/Student';
import {Teacher} from '../../../entity/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpsvr: HttpService) { }

  teacherList = (queryParams: any): Observable<{list: Array<Teacher>, total: number}> => {
    return this.httpsvr.onHttpGet('/api/corp/basemsg/teacher/teacherList', queryParams);
  }


  /**
   * 导出
   */
  onExport = (queryParams: any): Observable<string> => {
    return  this.httpsvr.onHttpGet('/api/corp/basemsg/teacher/teacherExcel', queryParams);
  }

}
