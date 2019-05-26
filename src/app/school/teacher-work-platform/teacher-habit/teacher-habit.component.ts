import { Component, OnInit } from '@angular/core';
import {Habit} from '../../../entity/Habit';
import {IHabitQueryParams} from '../../../shared/interface/queryparams/IHabitQueryParams';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CommonService} from '../../../shared/common.service';
import {HabitService} from '../../../shared/service/business/habit.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {Subject} from 'rxjs';
import {HabitExam} from '../../../entity/HabitExam';

@Component({
  selector: 'app-teacher-habit',
  templateUrl: './teacher-habit.component.html',
  styleUrls: ['./teacher-habit.component.css']
})
export class TeacherHabitComponent implements OnInit {
  examHabitWinOrder$: Subject<{nowState: string , habitExam: HabitExam, habits: Array<Habit>}> =
    new Subject<{nowState: string , habitExam: HabitExam, habits: Array<Habit>}>();
  noExamHabitWinOrder$: Subject<{nowState: string , habit: Habit}> =
    new Subject<{nowState: string , habit: Habit}>();
  user: LoginUser = this.usersvr.getUserStorage();
  habitStyle = 'normal';
  examHabitArray: Array<Habit> = new Array<Habit>();
  noExamHabitArray: Array<Habit> = new Array<Habit>();
  examQueryParam: IHabitQueryParams = {
    schoolId: this.user.school.schoolId,
    examed: '1',
    pageBegin: 0,
    pageSize: 10,
    pageNo : 1
  };
  examTotal = 0;
  noExamQueryParam: IHabitQueryParams = {
    schoolId: this.user.school.schoolId,
    examed : '0',
    pageBegin: 0,
    pageSize: 10,
    pageNo : 1
  };
  noExamTotal = 0;
  constructor(private usersvr: UserService, private habitsvr: HabitService,
              private modalService: NzModalService,
              private message: NzMessageService, public commonsvr: CommonService, private classessvr: ClassesService) { }

  ngOnInit() {
      this.classessvr.teacherTeachedClasses(this.user.teacher.teacherId, this.user.school.schoolId, this.user.school.schoolStyle).subscribe(
          re => {
            this.examQueryParam.classesId = re.map(v => v.classesId).join(',');
            this.noExamQueryParam.classesId = this.examQueryParam.classesId;
            this.onQueryExamHabit();
            this.onQueryNoExamHabit();

          }
      );
  }
  onAdd = () => {
   if (this.habitStyle === 'normal') {
      this.noExamHabitWinOrder$.next({nowState: 'add', habit: null});
   } else {
       this.examHabitWinOrder$.next({nowState: 'add', habitExam : null, habits: null});
   }
  }
 onQueryExamHabit = () => {
   this.examQueryParam.pageBegin = 0;
   this.examQueryParam.pageSize = 10;

   this.habitsvr.habitList(this.examQueryParam).subscribe(
      re => this.examHabitArray = re
   );
   this.habitsvr.habitListTotal(this.examQueryParam).subscribe(
        re => this.examTotal = re
   );
 }
  onPageChangeExam = (e) => {
    this.examQueryParam.pageNo = e;
    this.examQueryParam.pageBegin = (this.examQueryParam.pageNo - 1) * this.examQueryParam.pageSize;
    this.habitsvr.habitList(this.examQueryParam).subscribe(
      re => this.examHabitArray = re
    );
  }
  onQueryNoExamHabit = () => {
    this.noExamQueryParam.pageBegin = 0;
    this.noExamQueryParam.pageNo = 1;
    this.noExamQueryParam.pageSize = 10;
    this.habitsvr.habitList(this.noExamQueryParam).subscribe(
      re => this.noExamHabitArray = re
    );
    this.habitsvr.habitListTotal(this.noExamQueryParam).subscribe(
      re => this.noExamTotal = re
    );
  }

  onPageChangeNoExam = (e) => {
    this.noExamQueryParam.pageNo = e;
    this.noExamQueryParam.pageBegin = (this.noExamQueryParam.pageNo - 1) * this.noExamQueryParam.pageSize;
    this.habitsvr.habitList(this.noExamQueryParam).subscribe(
      re => this.noExamHabitArray = re
    );
  }


  examHabitSaved = (e) => {
       this.onQueryExamHabit();
  }

  noExamHabitSaved = (e) => {
       this.onQueryNoExamHabit();
  }
}
