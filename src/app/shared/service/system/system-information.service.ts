import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {SystemInformation} from "../../../entity/SystemInformation";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SystemInformationService {

  constructor(private httpsvr : HttpService) { }



  sysInformationList =(queryParams : any): Observable<Array<SystemInformation>> =>{
    return this.httpsvr.onHttpGet('api/system/sysinformation/sysInformationList',queryParams)
  }

  sysInformationListTotal=() :Observable<number> =>{
      return this.httpsvr.onHttpGet('api/system/sysinformation/sysInformationList',{}).pipe(
         map(re => parseInt(re.total, 10))
      );
  }
  insertInformation =( systemInformation : SystemInformation) : Observable<string > =>{
    return this.httpsvr.onHttpPost('api/system/sysinformation/insertInformation',systemInformation).pipe(
      map( re => re.result)
    );
  }
}
