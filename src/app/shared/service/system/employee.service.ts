import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  httpsvr: HttpService) { }

  employeeList = (queryparams: any): Observable<Array<Employee>> => {
     return this.httpsvr.onHttpGet('/api/system/employee/employeeList', queryparams);
  }


  insertEmployee = (employee: Employee): Observable<string> => {
     return this.httpsvr.onHttpPost('/api/system/employee/insertEmployee', employee).pipe(map(re =>{
       console.log(re);
       return re;
     }));
  }
  updateEmployee = (employee: Employee): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/system/employee/updateEmployee', employee);
  }
  deleteEmployee = (employee: Employee): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/system/employee/updateEmployee', employee);
  }



}
