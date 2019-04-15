import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {flatMap, map} from 'rxjs/operators';
import {School} from '../../../entity/School';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';

@Component({
  selector: 'app-employee-mgr',
  templateUrl: './employee-mgr.component.html',
  styleUrls: ['./employee-mgr.component.css']
})
export class EmployeeMgrComponent implements OnInit {
  user = this.usersvr.getUserStorage();
  employeeWinOrder$: Subject<{nowState: string , employee: Employee}> = new Subject<{nowState: string , employee: Employee}>() ;

  queryParams = {
    paperId : '',
    employeeName : '',
    tel : '',
    dutyName : '',
    pageSize : 20,
    pageNo : 1,
    getTotal : '1'
  };
  employeeArray$: Observable<Array<Employee>> = new Observable<Array<Employee>>();
  total = 0;
  constructor(private employeesvr: EmployeeService , private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {

  this.onQuery();

  }
  onQuery = () => {
    this.queryParams.getTotal = '1';
    this.employeeArray$ = this.employeesvr.employeeList(this.queryParams).pipe(
      map( re => {
        this.total = re.total;
        return re.list ;
      })
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.getTotal = '0';
    this.employeeArray$ = this.employeesvr.employeeList(this.queryParams).pipe(
      map( re => re.list)
    );
  }

  onRegist = () => {
    this.employeeWinOrder$.next({nowState: 'add', employee: null});
  }
  onEdit = (employee: Employee) => {
    this.employeeWinOrder$.next({nowState: 'edit', employee});
  }
  onSaved = (employee: Employee) => {
    this.employeeArray$ = this.employeesvr.employeeList(this.queryParams).pipe(
      map( re => re.list)
    );
  }
  onDelete = (employee: Employee) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.employeeArray$ =  this.employeesvr.deleteEmployee(employee).pipe(
          flatMap(re => this.employeesvr.employeeList(this.queryParams))
        ).pipe(
          map( re => {
            this.total = re.total;
            return re.list ;
          })
        );
      }
    });
  }
}
