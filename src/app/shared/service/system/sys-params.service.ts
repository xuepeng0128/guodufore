import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {SystemParams} from '../../../entity/SystemParams';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SysParamsService {

  constructor(private  httpsvr: HttpService) { }

  getParams = (): Observable<SystemParams> => {
     return this.httpsvr.onHttpGet('api/system/wxparams/wxparams', {});
  }

  setParams = (params: SystemParams): Observable<string> => {
    return this.httpsvr.onHttpPost('api/system/wxparams/insertWxparams', params).pipe(
       map( re => re.result)
    );
  }
}
