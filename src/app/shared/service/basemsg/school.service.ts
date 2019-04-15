import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {School} from '../../../entity/School';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpsvr: HttpService) { }

  schoolList = (queryparam: any): Observable<{list: Array<School>, total: number}> => {
         return this.httpsvr.onHttpGet('/api/corp/basemsg/school/schoolList', queryparam);
  }

  insertSchool = (school: School): Observable<School> => {
        return this.httpsvr.onHttpPost('/api/corp/basemsg/school/insertSchool', school);
  }

  updateSchool = (school: School): Observable<School> => {
        return this.httpsvr.onHttpPost('/api/corp/basemsg/school/updateSchool', school);
  }

  deleteSchool = (school: School): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/corp/basemsg/school/deleteSchool', school);
  }
}
