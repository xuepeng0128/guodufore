import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/User';
import {TeacherDuty} from '../../../entity/TeacherDuty';
import {UserService} from '../../../shared/user.service';
import {TeacherdutyService} from '../../../shared/service/dic/teacherduty.service';
import {iif} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-teacher-duty',
  templateUrl: './teacher-duty.component.html',
  styleUrls: ['./teacher-duty.component.css']
})
export class TeacherDutyComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  isTeacherDutyModalShow = false;
  teacherdutyArray: Array<TeacherDuty> = new Array<TeacherDuty>();
  currentTeacherDuty: TeacherDuty = new TeacherDuty({});
  editState = 'browse';
  constructor(private usersvr: UserService, private teacherdutysvr: TeacherdutyService,
              private message: NzMessageService , private modalService: NzModalService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.teacherdutysvr.teacherDutyList().subscribe(re => {
      this.teacherdutyArray = re;
    });
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentTeacherDuty = new TeacherDuty({});
    this.isTeacherDutyModalShow = true;
  }
  onEdit = (teacherDuty: TeacherDuty) => {
    this.currentTeacherDuty = teacherDuty;
    this.editState = 'edit';
    this.isTeacherDutyModalShow = true;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
      this.teacherdutysvr.insertTeacherDuty(this.currentTeacherDuty),
      this.teacherdutysvr.updateTeacherDuty(this.currentTeacherDuty)
    ).subscribe(re => {
      if (re) {
        this.message.create('success', MSG_SAVE_SUCCESS);
        this.onQuery();
        this.isTeacherDutyModalShow = false;
      } else {
        this.message.create('error', MSG_SAVE_ERROR);
      }

    });
  }
  onDelete = (teacherDuty: TeacherDuty) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.teacherdutysvr.deleteTeacherDuty(teacherDuty).pipe(
          switchMap(() => this.teacherdutysvr.teacherDutyList())
        ).subscribe( re => {
          this.teacherdutyArray = re ;
        });
      }
    });
  }
}
