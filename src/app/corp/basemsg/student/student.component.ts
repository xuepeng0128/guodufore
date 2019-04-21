import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Student} from '../../../entity/Student';
import {StudentService} from '../../../shared/service/basemsg/student.service';
import {map} from 'rxjs/operators';
import {CommonService} from '../../../shared/common.service';
import {User} from '../../../entity/User';
import {UserService} from '../../../shared/user.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginUser} from '../../../entity/LoginUser';
import {IStudentQueryParams} from '../../../shared/interface/queryparams/IStudentQueryParams';
import {IStudentQueryResult} from '../../../shared/interface/queryparams/IStudentQueryResult';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  studentList$: Observable<Array<IStudentQueryResult>> = of([]);
  total$ = of(0);
  queryParams: IStudentQueryParams = {
        studentPaperId : '',
        studentName: '',
        schoolName: '',
        pageSize : 20,
        pageNo : 1,
        pageBegin : 0
  };
  constructor(private studentsvr: StudentService, public  commonsvr: CommonService,
              private usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {
  }

  onQuery = () => {
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.queryParams.pageNo = 1;
    this.studentList$ = this.studentsvr.studentList(this.queryParams);
    this.total$ = this.studentsvr.studentListTotal(this.queryParams);
  }

  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.studentList$ = this.studentsvr.studentList(this.queryParams);
  }

}
