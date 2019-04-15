import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Menu} from '../../../entity/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpsvr: HttpService) { }

  allMenu = (kind: string ): Observable<Array<Menu>> => {
     return this.httpsvr.onHttpGet('/api/corp/system/menu/allMenu', {kind });
  }




}
