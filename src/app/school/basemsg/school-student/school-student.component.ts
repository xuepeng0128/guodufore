import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {IStudentQueryResult} from '../../../shared/interface/queryparams/IStudentQueryResult';
import {IStudentQueryParams} from '../../../shared/interface/queryparams/IStudentQueryParams';
import {StudentService} from '../../../shared/service/basemsg/student.service';
import {CommonService} from '../../../shared/common.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-school-student',
  templateUrl: './school-student.component.html',
  styleUrls: ['./school-student.component.css']
})
export class SchoolStudentComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  studentList: Array<IStudentQueryResult> = new Array<IStudentQueryResult>();
  total = 0;
  queryParams: IStudentQueryParams = {
    studentPaperId: '',
    studentName: '',
    schoolId: this.user.school.schoolId,
    pageSize: 20,
    pageNo: 1,
    pageBegin: 0
  };

  constructor(private studentsvr: StudentService, public  commonsvr: CommonService,
              private usersvr: UserService, private message: NzMessageService) {
  }

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

  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.studentsvr.studentList(this.queryParams).subscribe(
      re => this.studentList = re
    );
  }
}
