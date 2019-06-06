import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {School} from '../../../entity/School';
import {ISchoolQueryParams} from '../../interface/queryparams/ISchoolQueryParams';
import {ISchoolQueryResult} from '../../interface/queryparams/ISchoolQueryResult';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpsvr: HttpService) { }

  schoolList = (queryparam: ISchoolQueryParams): Observable<Array<ISchoolQueryResult>> => {
         return this.httpsvr.onHttpGet('api/basemsg/school/schoolList', queryparam);
  }
 schoolListTotal = (queryparam: ISchoolQueryParams): Observable<number> => {
   return this.httpsvr.onHttpGet('api/basemsg/school/schoolListTotal', queryparam).pipe(
      map(re => re.total)
   );
 }
  insertSchool = (school: School): Observable<string> => {
        return this.httpsvr.onHttpPost('api/basemsg/school/insertSchool', school).pipe(
          map( re => re.result)
        );
  }

  updateSchool = (school: School): Observable<string> => {
        return this.httpsvr.onHttpPost('api/basemsg/school/updateSchool', school).pipe(
          map( re => re.result)
        );
  }

  deleteSchool = (schoolId: string): Observable<string> => {
    return this.httpsvr.onHttpGet('api/basemsg/school/deleteSchool', {schoolId}).pipe(
      map( re => re.result)
    );
  }
}
