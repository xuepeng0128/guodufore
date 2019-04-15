import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Classes} from '../../../entity/Classes';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpsvr: HttpService) { }

  classesList = (queryparams: any): Observable<Classes> => {
     return this.httpsvr.onHttpGet('/api/corp/basemsg/classes/classesList', queryparams);
  }

  schoolClassesList = (queryparams: any): Observable<Array<Classes>> => {
    return this.httpsvr.onHttpGet('/api/school/basemsg/classes/classesList', queryparams);
  }


  insertClasses = (classes: Classes): Observable<Classes> => {
    return this.httpsvr.onHttpPost('/api/school/basemsg/classes/insertClasses', classes);
  }

  updateClasses = (classes: Classes): Observable<Classes> => {
    return this.httpsvr.onHttpPost('/api/school/basemsg/classes/updateClasses', classes);
  }

  deleteClasses = (classes: Classes): Observable<Classes> => {
    return this.httpsvr.onHttpPost('/api/school/basemsg/classes/updateClasses', classes);
  }


}
