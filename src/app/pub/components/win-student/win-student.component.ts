import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {iif, Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';
import {StudentService} from '../../../shared/service/basemsg/Student.service';
import {UserService} from '../../../shared/user.service';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {ClassesStudent} from '../../../entity/ClassesStudent';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-win-student',
  templateUrl: './win-student.component.html',
  styleUrls: ['./win-student.component.css']
})
export class WinStudentComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  @Input() classStudentWinOrder$: Subject<{nowState: string , classesStudent: ClassesStudent, classesId: string}> ;
  @Output() onStudentSaved: EventEmitter<{nowState: string , classesStudent : ClassesStudent}> = new EventEmitter<{nowState: string , classesStudent : ClassesStudent}>();
  currentStudent: ClassesStudent = new ClassesStudent({sex : 1});
  isStudentModalShow = false;
  nowState = 'browse';
  constructor( private message: NzMessageService, private classessvr: ClassesService,
               private studentsvr: StudentService, private usersvr: UserService) { }

  ngOnInit() {

    this.classStudentWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        this.currentStudent = new ClassesStudent({sex : 1, schoolId: this.loginUser.school.schoolId, classesId : re.classesId});
      } else if (re.nowState === 'edit') {
        this.currentStudent = re.classesStudent;
      }
      this.isStudentModalShow = true;
      this.nowState = re.nowState;
    });
  }

  onSave = () => {
    // 验证
    this.message.remove();
    if (this.currentStudent.studentId.length === 0 || isNullOrUndefined(this.currentStudent.studentId)) {
      this.message.create('error', '请输入学号'); return;
    }
    if (this.currentStudent.studentName.length === 0 || isNullOrUndefined(this.currentStudent.studentName)) {
      this.message.create('error', '请输入姓名'); return;
    }
    if (this.currentStudent.studentName.length === 0 || isNullOrUndefined(this.currentStudent.studentName)) {
      this.message.create('error', '请输入姓名'); return;
    }
    // 补全school区，Student
    iif (() => this.nowState === 'add',
      this.classessvr.insertClassesStudent(this.currentStudent),
      this.classessvr.updateClassesStudent(this.currentStudent)
    ).subscribe(
      re => {
        if (re === 'ok') {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onStudentSaved.emit({nowState: this.nowState, classesStudent: this.currentStudent});
          this.isStudentModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
}
