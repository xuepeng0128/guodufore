import { Injectable } from '@angular/core';
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {HabitUnit} from "../../../entity/HabitUnit";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HabitUnitService {

  constructor(private httpsvr: HttpService) { }

  habitUnitList =() :Observable<Array<HabitUnit>> =>{
     return this.httpsvr.onHttpGet('api/dic/habitUnit/habitUnitList',{});
  }
  insertHabitUnit =(habitUnit : HabitUnit) : Observable<string> =>{
      return this.httpsvr.onHttpGet('api/dic/habitUnit/inserthabitUnit',{unitName: habitUnit.unitName})
        .pipe(
          map( re => re.result)
        );
  }
}
