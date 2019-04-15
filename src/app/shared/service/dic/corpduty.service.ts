import { Injectable } from '@angular/core';
import { HttpService } from '../baseapi/http.service';
import { CorpDuty } from 'src/app/entity/CorpDuty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorpdutyService {

  constructor(private httpsvr: HttpService) { }

  corpDutyList = (): Observable<Array<CorpDuty>> => {
    return this.httpsvr.onHttpGet('/api/dic/corpduty/corpDutyList', {});
  }
  findById = (corpDutyId: string): Observable<CorpDuty> => {
     return this.httpsvr.onHttpGet('', {corpDutyId});
  }
  insertCorpDuty = (corpDuty: CorpDuty): Observable<CorpDuty> => {
    return this.httpsvr.onHttpPost('/api/dic/corpduty/insertCorpDuty', corpDuty);
  }
  updateCorpDuty = (corpDuty: CorpDuty): Observable<CorpDuty> => {
    return this.httpsvr.onHttpPost('/api/dic/corpduty/updateCorpDuty', corpDuty);
  }

  deleteCorpDuty = (corpDuty: CorpDuty): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/corpduty/deleteCorpDuty', corpDuty);
  }



}
