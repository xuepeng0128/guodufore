import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {CommonService} from '../../../shared/common.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Notice} from '../../../entity/Notice';
import {NoticeService} from '../../../shared/service/business/notice.service';
import {NoticeStudent} from '../../../entity/NoticeStudent';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {Classes} from '../../../entity/Classes';
import {ClassesStudent} from '../../../entity/ClassesStudent';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

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
    teacherId : this.loginUser.teacher.teacherId,
    noticeContent : '',
    pageSize : 10,
    pageNo : 1,
    pageBegin : 0
  };
  isNoticeModalShow = false;
  currentNotice: Notice = new Notice();
  teachedClassesList: Array<Classes> = new Array<Classes>();
  choosedStudents: Array<NoticeStudent> = new Array<NoticeStudent>();
  checkeClasses: Array<{ label: string ; value: string; checked: boolean;  students: Array<ClassesStudent>}>
    = new Array<{label: string, value: string, checked: boolean, students: Array<ClassesStudent>}>();
  constructor(private noticesvr: NoticeService, private classessvr: ClassesService,
              public  commonsvr: CommonService,
              private usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {

    this.classessvr.teacherTeachedClasses( this.loginUser.teacher.teacherId, this.loginUser.school.schoolId, this.loginUser.school.schoolStyle).subscribe(
        re => {
          this.teachedClassesList = re;
          this.teachedClassesList.forEach( v => {
            this.checkeClasses.push(
              { label: this.clag(v.grade) + '年级' + v.classes + '班' , value: v.classesId, checked: true,  students : v.students}
              );
          });
        }
    );
  }

  onQuery = () => {
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.queryParams.pageNo = 1;
    this.noticesvr.noticeList(this.queryParams).subscribe(
      re => this.noticeList = re
    );

    this.noticesvr.noticeListTotal(this.queryParams).subscribe(
      re => this.total = re
    );
  }

  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.noticesvr.noticeList(this.queryParams).subscribe(
      re => this.noticeList = re
    );
  }

 onAdd = () => {
    this.currentNotice = new Notice({});
    this.choosedStudents.length = 0;
    this.isNoticeModalShow = true;
 }
 onSend = () => {
    this.currentNotice.noticeId = this.noticesvr.makeNoticeId();
    this.checkeClasses.filter(v => v.checked).forEach(
       s =>  s.students.forEach( k =>
         this.choosedStudents.push( new NoticeStudent({noticeId : this.currentNotice.noticeId, studentId: k.studentId}))
       )
    );

    this.noticesvr.insertNotice({notice : this.currentNotice, noticeStudents : this.choosedStudents}).subscribe(re => {
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



 clag = (grade: number): string => {
   return  this.loginUser.school.schoolStyle === 1 ? this.commonsvr.calculateSchoolYearPrimarySchool(grade) : this.commonsvr.calculateSchoolYearMiddleSchool(grade);
 }

}
