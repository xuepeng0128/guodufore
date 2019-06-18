import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {Habit} from '../../../entity/Habit';
import {HabitService} from '../../../shared/service/business/habit.service';
import {NzMessageService} from 'ng-zorro-antd';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {HabitExam} from '../../../entity/HabitExam';
import {CommonService} from '../../../shared/common.service';
import {UserService} from '../../../shared/user.service';
import {LoginUser} from '../../../entity/LoginUser';
import {Student} from '../../../entity/Student';
import {Circle} from '../../../entity/Circle';
import {CircleService} from '../../../shared/service/business/circle.service';
import {HabitTemplate} from '../../../entity/HabitTemplate';

@Component({
  selector: 'app-win-exam-habit',
  templateUrl: './win-exam-habit.component.html',
  styleUrls: ['./win-exam-habit.component.css']
})
export class WinExamHabitComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  @Input() examHabitWinOrder$: Subject<{nowState: string , habitExam: HabitExam, habits: Array<Habit>}> =
    new Subject<{nowState: string , habitExam: HabitExam, habits: Array<Habit>}>();
  @Output() onExamHabitSaved: EventEmitter<string> = new EventEmitter<string>();
  iconWinOrder$: Subject<string> = new Subject<string>();
  habitTemplateChooseSign$: Subject<string> = new Subject<string>();
  currentExam: HabitExam = new HabitExam();
  examHabitList: Array<Habit> = new Array<Habit>();
  currentHabit: Habit = new Habit({mode : 1});
  isExamHabitModalShow = false;
  nowState = 'browse';
  nowEditHabit = 'browse';
  choosedStudents: Array<Student> = new Array<Student>();
  limitTime = new Date('2001-01-01 00:30:00');
  circleStudentChooseSign$: Subject<{ circleId: string, haveChoosedStudent: Array<Student>}>
    = new Subject<{ circleId: string, haveChoosedStudent: Array<Student>}>();


  nowChooseCircleId = '';
  teacherJoinedCircleArray: Array<Circle> = new Array<Circle>();
  iscurrentExamHabitModalShow = false;

  nowtime = new Date();
  constructor(private habitsvr: HabitService, private message: NzMessageService,
              public  commonsvr: CommonService, private usersvr: UserService,
              private circlesvr: CircleService) { }

  ngOnInit() {
    this.examHabitWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        const habitExamId = this.habitsvr.onMakeExamId();
        this.currentExam = new HabitExam({habitExamId, teacherId: this.loginUser.teacher.teacherId, examBeginDate : new Date(), examEndDate : this.commonsvr.dateAdd(new Date(), 7) });
        this.examHabitList=new Array<Habit>() ;

      } else if (re.nowState === 'edit') {
        this.currentExam = re.habitExam;
        this.habitsvr.examHabits(re.habitExam.habitExamId).subscribe(
          re =>{
            this.examHabitList=re;
            this.habitsvr.getHabitStudents(re[0].habitId,this.loginUser.school.schoolId).subscribe(
              res => this.choosedStudents=res
            ) ;
          }
        )
      }else {
        this.currentExam = re.habitExam;
        this.habitsvr.examHabits(re.habitExam.habitExamId).subscribe(
          re =>{
                  this.examHabitList=re;
                  this.habitsvr.getHabitStudents(re[0].habitId,this.loginUser.school.schoolId).subscribe(
                       res => this.choosedStudents=res
                  ) ;
          }
        )
      }
      this.isExamHabitModalShow = true;
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
    // 验证
    this.message.remove();
    if (this.currentExam.examTitle ==='') {
      this.message.create('error', '请输入考核目标'); return;
    }
    if ( this.choosedStudents.length===0) {
      this.message.create('error', '请加入学生');
      return;
    }
    if (this.examHabitList.length===0){
      this.message.create('error', '请加入习惯');
      return;
    }


    this.examHabitList.forEach(v => {
        v.putCardBeginDate = this.currentExam.examBeginDate;
        v.putCardEndDate = this.currentExam.examEndDate;

    });
    this.habitsvr.insertExamHabit(
      { habitExam: this.currentExam, habits: this.examHabitList, studentIds: this.choosedStudents.map(v => v.studentId)}).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onExamHabitSaved.emit('');
          this.isExamHabitModalShow = false;
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



  onAddHabit = () => {


      this.currentHabit =  new Habit({
        habitId : this.habitsvr.onMakeHabitId(),
        circleId : this.nowChooseCircleId,
        mode : 1,
       habitExamId : this.currentExam.habitExamId,
       buildTeacherId: this.loginUser.teacher.teacherId,
       putCardBeginDate : this.currentExam.examBeginDate,
       putCardEndDate : this.currentExam.examEndDate
    });

      this.iscurrentExamHabitModalShow = true;
      this.nowEditHabit = 'add';
  }
  onEditHabit = (habit: Habit) => {
        this.currentHabit = habit;
        this.iscurrentExamHabitModalShow = true;
        this.nowEditHabit = 'edit';
  }
  onJoinedHabit = () => {
    // 验证
    this.message.remove();
    if (this.currentHabit.habitName ==='') {
      this.message.create('error', '请输入习惯标题'); return;
    }


    if (this.nowEditHabit === 'add') {
       this.examHabitList.push(this.currentHabit);
     }
     this.iscurrentExamHabitModalShow = false;
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

  showCurrentHabit=(item : Habit) =>{
    this.currentHabit=item;
    this.isExamHabitModalShow=true;
  }

  removeCurrentHabit=(item : Habit) =>{
      this.examHabitList=this.examHabitList.filter(o=>o.habitId !== item.habitId);
  }


  // 考核日期修改后，改变 习惯日期
  changeBeginEndDate=()=>{
       this.examHabitList.forEach(v =>{
          v.putCardBeginDate =this.currentExam.examBeginDate;
          v.putCardEndDate=this.currentExam.examEndDate;
       });
  }

}
