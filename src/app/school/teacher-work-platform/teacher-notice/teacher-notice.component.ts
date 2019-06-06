import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {CommonService} from '../../../shared/common.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {ITeacherNoticeParams} from '../../../shared/interface/queryparams/ITeacherNoticeParams';
import {TeacherNotice} from '../../../entity/TeacherNotice';
import {Circle} from '../../../entity/Circle';
import {TeacherNoticeService} from '../../../shared/service/business/teacher-notice.service';
import {CircleService} from '../../../shared/service/business/circle.service';

@Component({
  selector: 'app-teacher-notice',
  templateUrl: './teacher-notice.component.html',
  styleUrls: ['./teacher-notice.component.css']
})
export class TeacherNoticeComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  teacherNoticeList: Array<TeacherNotice> = new Array<TeacherNotice>();
  total = 0;
  queryParams: ITeacherNoticeParams = {
    buildTeacherId : this.loginUser.teacher.teacherId,
    schoolId : this.loginUser.school.schoolId,
    pageSize : 10,
    pageNo : 1,
    pageBegin : 0
  };
  isNoticeModalShow = false;
  currentNotice: TeacherNotice = new TeacherNotice();
  teacherJoinedCircleList: Array<Circle> = new Array<Circle>();

  constructor(private teachernoticesvr: TeacherNoticeService, private circlesvr: CircleService,
              public  commonsvr: CommonService,
              private usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {
     this.circlesvr.teacherJoinedCircles(this.loginUser.teacher.teacherId).subscribe(
         re => this.teacherJoinedCircleList = re
     );
  }

  onQuery = () => {
    this.teachernoticesvr.teacherNoticeList(this.queryParams).subscribe(
      re => this.teacherNoticeList = re
    );

    this.teachernoticesvr.teacherNoticeListTotal(this.queryParams).subscribe(
      re => this.total = re
    );
  }

  onPageChange = () => {
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.teachernoticesvr.teacherNoticeList(this.queryParams).subscribe(
      re => this.teacherNoticeList = re
    );
  }

 onAdd = () => {
    this.currentNotice = new TeacherNotice({
      teacherNoticeId : this.teachernoticesvr.makeTeacherNoticeId(),
      schoolId : this.loginUser.school.schoolId,
      buildTeacherId: this.loginUser.teacher.teacherId,
      sendCircleIds : this.teacherJoinedCircleList[0].circleId || ''
    });
    this.isNoticeModalShow = true;
 }
 onSend = () => {
    this.teachernoticesvr.insertTeacherNotice(this.currentNotice).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isNoticeModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      }
    );
 }




}
