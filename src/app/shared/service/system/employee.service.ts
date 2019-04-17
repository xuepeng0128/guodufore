import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../entity/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  httpsvr: HttpService) { }

  employeeList = (queryparams: any): Observable<Array<Employee>> => {
     return this.httpsvr.onHttpGet('/api/system/employee/employeeList', queryparams);
  }
  insertEmployee = (employee: Employee): Observable<String> => {
     return this.httpsvr.onHttpPost('/api/system/employee/insertEmployee', employee);
  }
  updateEmployee = (employee: Employee): Observable<String> => {
    return this.httpsvr.onHttpPost('/api/system/employee/updateEmployee', employee);
  }
  deleteEmployee = (employee: Employee): Observable<String> => {
    return this.httpsvr.onHttpPost('/api/system/employee/updateEmployee', employee);
  }



}
