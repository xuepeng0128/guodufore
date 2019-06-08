import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {ExamKind} from "../../../entity/ExamKind";

@Injectable({
  providedIn: 'root'
})
export class ExamKindService {

  constructor(private httpsvr : HttpService) { }
  examKindList =() : Observable<Array<ExamKind>> =>{
      return this.httpsvr.onHttpGet('/api/dic/examkind/examKindList',{});
  }
}
