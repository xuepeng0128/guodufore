import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ITeacherNoticeParams} from '../../interface/queryparams/ITeacherNoticeParams';
import {TeacherNotice} from '../../../entity/TeacherNotice';

@Injectable({
  providedIn: 'root'
})
export class TeacherNoticeService {

  constructor(private httpsvr: HttpService) { }

  teacherNoticeList = (queryParams: ITeacherNoticeParams): Observable<Array<TeacherNotice>> => {
    return this.httpsvr.onHttpGet('/api/business/teachernotice/teachernoticeList', queryParams);
  }

  teacherNoticeListTotal = (queryParams: ITeacherNoticeParams): Observable<number> => {
    return this.httpsvr.onHttpGet('/api/business/teachernotice/teacherNoticeListTotal', queryParams).pipe(
      map( re => parseInt( re , 10))
    );
  }
 insertTeacherNotice = (teacherNotice: TeacherNotice): Observable<string > => {
   return this.httpsvr.onHttpPost('/api/business/teachernotice/insertTeacherNotice', teacherNotice).pipe(
     map(re => re.result)
   );
 }
  makeTeacherNoticeId = (): string => {
    const t = new Date().getTime();
    return 'TNO' + t;
  }

}
