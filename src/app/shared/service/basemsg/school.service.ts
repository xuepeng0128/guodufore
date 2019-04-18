import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {School} from '../../../entity/School';
import {ISchoolQueryParams} from '../../interface/queryparams/ISchoolQueryParams';
import {ISchoolQueryResult} from '../../interface/queryparams/ISchoolQueryResult';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpsvr: HttpService) { }

  schoolList = (queryparam: ISchoolQueryParams): Observable<Array<ISchoolQueryResult>> => {
         return this.httpsvr.onHttpGet('/api/corp/basemsg/school/schoolList', queryparam);
  }
 schoolListTotal = (queryparam: ISchoolQueryParams): Observable<number> => {
   return this.httpsvr.onHttpGet('/api/corp/basemsg/school/schoolListTotal', queryparam);
 }
  insertSchool = (school: School): Observable<School> => {
        return this.httpsvr.onHttpPost('/api/corp/basemsg/school/insertSchool', school);
  }

  updateSchool = (school: School): Observable<School> => {
        return this.httpsvr.onHttpPost('/api/corp/basemsg/school/updateSchool', school);
  }

  deleteSchool = (schoolId: string): Observable<string> => {
    return this.httpsvr.onHttpGet('/api/corp/basemsg/school/deleteSchool', {schoolId});
  }
}
