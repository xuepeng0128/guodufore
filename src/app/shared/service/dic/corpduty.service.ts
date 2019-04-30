import { Injectable } from '@angular/core';
import { HttpService } from '../baseapi/http.service';
import { CorpDuty } from 'src/app/entity/CorpDuty';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorpdutyService {

  constructor(private httpsvr: HttpService) { }

  corpDutyList = (): Observable<Array<CorpDuty>> => {
    return this.httpsvr.onHttpGet('api/dic/corpduty/corpDutyList', {});
  }
  insertCorpDuty = (corpDuty: CorpDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/corpduty/insertCorpDuty', corpDuty).pipe(
      map( re => re.result)
    );
  }
  updateCorpDuty = (corpDuty: CorpDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/corpduty/updateCorpDuty', corpDuty).pipe(
      map( re => re.result)
    );
  }

  deleteCorpDuty = (corpDuty: CorpDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/corpduty/deleteCorpDuty', corpDuty).pipe(
      map( re => re.result)
    );
  }



}
