import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../entity/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  httpsvr: HttpService) { }

employeeList = (queryparams: any): Observable<{ list: Array<Employee>, total: number}> => {
     return this.httpsvr.onHttpGet('/api/corp/system/employee/employeeList', queryparams);
  }
  singleEmployee = (paperId: string): Observable<Employee> => {
    return this.httpsvr.onHttpGet('/api/corp/system/employee/singleEmployee', {paperId});
  }
  insertEmployee = (employee: Employee): Observable<Employee> => {
     return this.httpsvr.onHttpPost('/api/corp/system/employee/insertEmployee', employee);
  }
  updateEmployee = (employee: Employee): Observable<Employee> => {
    return this.httpsvr.onHttpPost('/api/corp/system/employee/updateEmployee', employee);
  }
  deleteEmployee = (employee: Employee): Observable<Employee> => {
    return this.httpsvr.onHttpPost('/api/corp/system/employee/updateEmployee', employee);
  }



}
