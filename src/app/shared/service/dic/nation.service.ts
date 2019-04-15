import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Nation} from '../../../entity/Nation';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private  httpsvr: HttpService) { }
  nationList = (): Observable<Array<Nation>> => {
       return this.httpsvr.onHttpGet('api/dic/nation/nationList', null);
  }
}
