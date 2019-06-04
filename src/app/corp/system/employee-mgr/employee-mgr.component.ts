import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {flatMap, map} from 'rxjs/operators';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-employee-mgr',
  templateUrl: './employee-mgr.component.html',
  styleUrls: ['./employee-mgr.component.css']
})
export class EmployeeMgrComponent implements OnInit {
  user = this.usersvr.getUserStorage();
  employeeWinOrder$: Subject<{nowState: string , employee: Employee}> = new Subject<{nowState: string , employee: Employee}>() ;

  queryParams = {
    employeePaperId : '',
    tel : '',
    employeeName : '',
    corpDutyName : ''
  };
  employeeArray$: Observable<Array<Employee>> = of([]);
  constructor(private employeesvr: EmployeeService , private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {

  this.onQuery();

  }
  onQuery = () => {
    this.employeeArray$ = this.employeesvr.employeeList(this.queryParams);
  }
  onPageChange = (e) => {
    this.employeeArray$ = this.employeesvr.employeeList(this.queryParams);
  }

  onRegist = () => {
    this.employeeWinOrder$.next({nowState: 'add', employee: null});
  }
  onEdit = (employee: Employee) => {
    this.employeeWinOrder$.next({nowState: 'edit', employee});
  }
  onSaved = (employee: Employee) => {
    this.employeeArray$ = this.employeesvr.employeeList(this.queryParams);
  }
  onDelete = (employee: Employee) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.employeeArray$ =  this.employeesvr.deleteEmployee(employee).pipe(
          flatMap(re => this.employeesvr.employeeList(this.queryParams))
        );
      }
    });
  }
}
