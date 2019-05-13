import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Notice} from '../../../entity/Notice';
import {map} from 'rxjs/operators';
import {NoticeStudent} from '../../../entity/NoticeStudent';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpsvr: HttpService) { }

  noticeList = (queryParams: any): Observable<Array<Notice>> => {
    return this.httpsvr.onHttpGet('/api/basemsg/notice/noticeList', queryParams);
  }

  noticeListTotal = (queryParams: any): Observable<number> => {
    return this.httpsvr.onHttpGet('/api/basemsg/notice/noticeListTotal', queryParams).pipe(
      map( re => parseInt( re , 10))
    );
  }

  noticeStudentList = (queryParams: any): Observable<Array<NoticeStudent>> => {
    return this.httpsvr.onHttpGet('/api/basemsg/notice/noticeStudentList', queryParams);
  }

  insertNotice = (queryParams: {notice: Notice, noticeStudents: Array<NoticeStudent>}): Observable<string > => {
      return this.httpsvr.onHttpPost('/api/basemsg/notice/insertNotice', queryParams).pipe(
        map(re => re.result)
      );
  }



  makeNoticeId = (): string => {
    const t = new Date().getTime();
    return 'not' + t;
  }

}
