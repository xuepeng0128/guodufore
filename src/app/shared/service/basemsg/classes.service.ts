import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Classes} from '../../../entity/Classes';
import {IClassQueryParams} from '../../interface/queryparams/IClassQueryParams';
import {IClassQueryResult} from '../../interface/queryparams/IClassQueryResult';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpsvr: HttpService) { }

  classesList = (queryparams: IClassQueryParams): Observable<Array<IClassQueryResult>> => {
     return this.httpsvr.onHttpGet('/api/basemsg/classes/classesList', queryparams);
  }

  classListTotal = (queryparams: IClassQueryParams): Observable<number> => {
    return this.httpsvr.onHttpGet('/api/basemsg/classes/classesListTotal', queryparams);
  }


  insertClasses = (classes: Classes): Observable<Classes> => {
    return this.httpsvr.onHttpPost('/api/basemsg/classes/insertClasses', classes);
  }

  updateClasses = (classes: Classes): Observable<Classes> => {
    return this.httpsvr.onHttpPost('/api/basemsg/classes/updateClasses', classes);
  }

  deleteClasses = (classes: Classes): Observable<Classes> => {
    return this.httpsvr.onHttpPost('/api/basemsg/classes/updateClasses', classes);
  }


}
