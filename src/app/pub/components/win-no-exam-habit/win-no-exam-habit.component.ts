import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Subject} from 'rxjs';
import {Habit} from '../../../entity/Habit';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ISupUploadfiles} from '../../../shared/interface/ISupUploadfiles';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {HabitService} from '../../../shared/service/business/habit.service';
import {HabitExam} from '../../../entity/HabitExam';
import {Circle} from '../../../entity/Circle';
import {CircleService} from '../../../shared/service/business/circle.service';
import {Student} from '../../../entity/Student';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {HabitTemplate} from '../../../entity/HabitTemplate';

@Component({
  selector: 'app-win-no-exam-habit',
  templateUrl: './win-no-exam-habit.component.html',
  styleUrls: ['./win-no-exam-habit.component.css']
})
export class WinNoExamHabitComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  @Input() noExamHabitWinOrder$: Subject<{nowState: string , habit: Habit}> =
    new Subject<{nowState: string , habit: Habit}>();
  @Output() onNoExamHabitSaved: EventEmitter<string> = new EventEmitter<string>();
  iconWinOrder$: Subject<string> = new Subject<string>();
  habitTemplateChooseSign$: Subject<string> = new Subject<string>();

  currentHabit: Habit = new Habit({mode : 1 });
  isNoExamHabitModalShow = false;
  nowState = 'browse';
  choosedStudents: Array<Student> = new Array<Student>();
  limitTime = new Date('2001-01-01 00:30:00');
  circleStudentChooseSign$: Subject<{ circleId: string, haveChoosedStudent: Array<Student>}>
    = new Subject<{ circleId: string, haveChoosedStudent: Array<Student>}>();

  nowChooseCircleId = '';
  teacherJoinedCircleArray: Array<Circle> = new Array<Circle>();
  constructor(private habitsvr: HabitService, private message: NzMessageService,
              private usersvr: UserService, private circlesvr: CircleService) { }



  ngOnInit() {
    this.noExamHabitWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        this.currentHabit = new Habit({
          circleId : this.nowChooseCircleId,
          mode : 1
        });
      } else if (re.nowState === 'edit') {
        this.currentHabit = re.habit;
      }
      this.isNoExamHabitModalShow = true;
    });

    this.circlesvr.teacherJoinedCircles(this.loginUser.teacher.teacherId).subscribe(
      re => {
        this.teacherJoinedCircleArray = re;
        if (this.teacherJoinedCircleArray.length > 0) {
          this.nowChooseCircleId = this.teacherJoinedCircleArray[0].circleId;
        }
      }
    );

  }

  onSave = () => {
   const hlist: Array<Habit> = new Array<Habit>();
   hlist.push(this.currentHabit);
   this.habitsvr.insertExamHabit({ habitExam: null, habits: hlist, studentIds: this.choosedStudents.map(v => v.studentId)}).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onNoExamHabitSaved.emit('');
          this.isNoExamHabitModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
  showStudentChoose = () => {
    this.circleStudentChooseSign$.next({ circleId: this.nowChooseCircleId, haveChoosedStudent: this.choosedStudents});
  }
  studentChoosed = (students: Array<Student>) => {
    this.choosedStudents = students;
  }
  removeChoosedStudent = (student: Student) => {
    this.choosedStudents = this.choosedStudents.filter(o => o.studentId !== student.studentId);
  }
  showIconChoose = () => {
    this.iconWinOrder$.next('open');
  }
  iconHavechoosed = (iconUrl: string) => {
    this.currentHabit.icon = iconUrl;
  }

  onChooseHabitTemplate = () => {
     this.habitTemplateChooseSign$.next('open');
  }

  tempChoosed = (habitTemplate: HabitTemplate) => {
    this.currentHabit.habitName = habitTemplate.habitTemplateName;
    this.currentHabit.habitClassId = habitTemplate.habitClassId;
    this.currentHabit.habitClassName = habitTemplate.habitClassName;
    this.currentHabit.subHabitClassId = habitTemplate.subHabitClassId;
    this.currentHabit.subHabitClassName = habitTemplate.subHabitClassName;
    this.currentHabit.icon = habitTemplate.icon;
    this.currentHabit.color = habitTemplate.color;
    this.currentHabit.memo = habitTemplate.memo;
    this.currentHabit.picUrl = habitTemplate.picUrl;
    this.currentHabit.pirTime = habitTemplate.perTime;
    this.currentHabit.timeUnit = habitTemplate.timeUnit;
    this.currentHabit.mode = habitTemplate.mode;
    this.currentHabit.timeModeNum = habitTemplate.timeModeNum;
    this.currentHabit.countModeNum = habitTemplate.countModeNum;
    this.currentHabit.valueModeNum = habitTemplate.valueModeNum;
    this.currentHabit.unitName = habitTemplate.unitName;

  }
}
