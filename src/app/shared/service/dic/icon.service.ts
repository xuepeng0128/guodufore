import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {Icon} from "../../../entity/Icon";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(private httpsvr: HttpService) { }

  iconList =(): Observable<Array<Icon>> =>{
    return this.httpsvr.onHttpGet('api/dic/icon/iconList', {});
  }

  insertIcon =(icon : Icon) : Observable<string> =>{
     return this.httpsvr.onHttpPost('api/dic/icon/insertIcon', icon).pipe(
       map( re => re.result)
     );
  }
  deleteIcon =(icon : Icon) : Observable<string> =>{
    return this.httpsvr.onHttpPost('api/dic/icon/deleteIcon', icon).pipe(
      map( re => re.result)
    );
  }
}
