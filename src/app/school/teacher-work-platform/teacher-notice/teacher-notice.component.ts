import { Component, OnInit } from '@angular/core';
import {LoginUser} from "../../../entity/LoginUser";
import {IStudentQueryResult} from "../../../shared/interface/queryparams/IStudentQueryResult";
import {IStudentQueryParams} from "../../../shared/interface/queryparams/IStudentQueryParams";
import {StudentService} from "../../../shared/service/basemsg/student.service";
import {CommonService} from "../../../shared/common.service";
import {UserService} from "../../../shared/user.service";
import {NzMessageService} from "ng-zorro-antd";
import {Notice} from "../../../entity/Notice";

@Component({
  selector: 'app-teacher-notice',
  templateUrl: './teacher-notice.component.html',
  styleUrls: ['./teacher-notice.component.css']
})
export class TeacherNoticeComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  noticeList: Array<Notice> = new Array<Notice>();
  total = 0;
  queryParams = {
    noticeContent :'',
    pageSize : 10,
    pageNo : 1,
    pageBegin : 0
  };
  constructor(private noticesvr: NoticeSv, public  commonsvr: CommonService,
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

  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.studentsvr.studentList(this.queryParams).subscribe(
      re => this.studentList = re
    );
  }

}
