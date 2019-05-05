import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Subject} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {NzMessageService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';

@Component({
  selector: 'app-win-teacher',
  templateUrl: './win-teacher.component.html',
  styleUrls: ['./win-teacher.component.css']
})
export class WinTeacherComponent implements OnInit {
  @Input() teacherWinOrder$: Subject<{nowState: string , teacher: Teacher}> ;
  @Output() onTeacherSaved: EventEmitter<string> = new EventEmitter<string>();
  currentTeacher: Teacher = new Teacher({});
  isTeacherModalShow = false;
  nowState = 'browse';
  constructor( private message: NzMessageService,
               private teachersvr: TeacherService) { }

  ngOnInit() {
    this.teacherWinOrder$.subscribe(re => {
      if (re.nowState === 'add') {
        this.currentTeacher = new Teacher({});
      } else if (re.nowState === 'edit') {
        this.currentTeacher = re.teacher;
      }
      this.isTeacherModalShow = true;
      this.nowState = re.nowState;
    });
  }

  onSave = () => {
    // 补全school区，teacher
    iif (() => this.nowState === 'add',
      this.teachersvr.insertTeacher(this.currentTeacher),
      this.teachersvr.updateTeacher(this.currentTeacher)
    ).subscribe(
      re => {
        if (re === 'ok') {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onTeacherSaved.emit(re);
          this.isTeacherModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
}
