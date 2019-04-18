import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {map} from 'rxjs/operators';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../entity/User';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginUser} from '../../../entity/LoginUser';
import {ITeacherQueryParams} from '../../../shared/interface/queryparams/ITeacherQueryParams';
import {ITeacherQueryResult} from '../../../shared/interface/queryparams/ITeacherQueryResult';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  teacherList$: Observable<Array<ITeacherQueryResult>> = of([]);
  total$ = of(0);
  queryParams: ITeacherQueryParams = {
        teacherName : '' ,
        schoolName : '' ,
        pageSize : 20 ,
        pageNo : 1 ,
        pageBegin : 0
  };
  constructor(private teachersvr: TeacherService, private  usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.teacherList$ = this.teachersvr.teacherList(this.queryParams);
    this.total$ = this.teachersvr.teacherListTotal(this.queryParams);
  }

  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.teacherList$ = this.teachersvr.teacherList(this.queryParams);
  }
  onExcelExport = () => {
    this.teachersvr.onExport(this.queryParams).subscribe();
  }
}
