import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {Notice} from "../../../entity/Notice";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpsvr : HttpService) { }

  noticeList =(queryParams : any) : Observable<Array<Notice>> =>{
    return this.httpsvr.onHttpGet('',queryParams);
  }
}
