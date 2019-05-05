import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HabitUnitService {

  constructor(private httpsvr: HttpService) { }

  habitUnitList =() :Observable<Array<{unitName : string}>> =>{
     return
  }
}
