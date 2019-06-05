import { Component, OnInit } from '@angular/core';

import {StudentService} from '../../../shared/service/basemsg/student.service';

import {CommonService} from '../../../shared/common.service';

import {UserService} from '../../../shared/user.service';

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
  studentList: Array<IStudentQueryResult> = new Array<IStudentQueryResult>();
  total = 0;
  queryParams: IStudentQueryParams = {
        studentPaperId : '',
        studentName: '',
        schoolName: '',
        pageSize : 10,
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
    this.studentsvr.studentList(this.queryParams).subscribe(
      re => this.studentList = re
    );

    this.studentsvr.studentListTotal(this.queryParams).subscribe(
      re => this.total = re
    );
  }

  onPageChange = () => {
    this.studentsvr.studentList(this.queryParams).subscribe(
     re => this.studentList = re
   );
  }

}
