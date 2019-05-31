import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {LoginUser} from '../../../entity/LoginUser';
import {ITeacherArticleQueryParams} from '../../../shared/interface/queryparams/ITeacherArticleQueryParams';
import {ITeacherArticleQueryResult} from '../../../shared/interface/queryparams/ITeacherArticleQueryResult';
import {TeacherArticle} from '../../../entity/TeacherArticle';
import {UserService} from '../../../shared/user.service';
import {TeacherArticleService} from '../../../shared/service/business/teacher-article.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {ITeacherLessonQueryParams} from '../../../shared/interface/queryparams/ITeacherLessonQueryParams';
import {TeacherLesson} from '../../../entity/TeacherLesson';
import {TeacherLessonService} from '../../../shared/service/business/teacher-lesson.service';
import {SubTeacherLesson} from '../../../entity/SubTeacherLesson';
import {Icon} from '../../../entity/Icon';
import {Router} from '@angular/router';
import {Habit} from '../../../entity/Habit';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-teacher-lessons',
  templateUrl: './teacher-lessons.component.html',
  styleUrls: ['./teacher-lessons.component.css']
})
export class TeacherLessonsComponent implements OnInit {

  habitChooseSign$: Subject<{ singleChoose: boolean, haveChoosedHabit: Array<Habit>}>
    = new Subject<{ singleChoose: boolean, haveChoosedHabit: Array<Habit>}>();
  loginUser: LoginUser = this.usersvr.getUserStorage();
  total = 0;
  loading = false;
  lessonArray: Array<TeacherLesson> = new Array<TeacherLesson>();
  constructor(private usersvr: UserService , public  teacherlessonsvr: TeacherLessonService,
              private modalService: NzModalService, private message: NzMessageService, private router: Router) { }
  ngOnInit() {
    this.teacherlessonsvr.queryParams.teacherId = this.loginUser.teacher.master ? '' : this.loginUser.teacher.teacherId;
    this.teacherlessonsvr.queryParams.schoolId = this.loginUser.school.schoolId;
    this.teacherlessonsvr.teacherLessonList(this.teacherlessonsvr.queryParams).subscribe(
      re => this.lessonArray = re
    );
    this.teacherlessonsvr.teacherLessonListTotal(this.teacherlessonsvr.queryParams).subscribe(
      re => this.total = re
    );
  }
  onQuery = () => {
    this.teacherlessonsvr.queryParams.pageNo = 1;
    this.teacherlessonsvr.queryParams.pageBegin = 0;
    this.teacherlessonsvr.teacherLessonList(this.teacherlessonsvr.queryParams).subscribe(
      re => this.lessonArray = re
    );
    this.teacherlessonsvr.teacherLessonListTotal(this.teacherlessonsvr.queryParams).subscribe(
      re => this.total = re
    );
  }
  onPageChange = (e) => {
    this.teacherlessonsvr.queryParams.pageNo = e;
    this.teacherlessonsvr.teacherLessonList(this.teacherlessonsvr.queryParams).subscribe(
      re => this.lessonArray = re
    );
  }


  onAdd = () => {

    const lessonId = this.teacherlessonsvr.makeLessonId();
    this.teacherlessonsvr.currentLesson = new TeacherLesson({
      lessonId,
      makeTeacherId: this.loginUser.teacher.teacherId,
      schoolId : this.loginUser.school.schoolId
    });

    this.teacherlessonsvr.currentSubLessonArray = new Array<SubTeacherLesson>();
    this.teacherlessonsvr.currentSubLessonArray.push(new SubTeacherLesson({}));
    this.router.navigate(['/frame/schoolteacherworkplatform/teacherlessonsdetail'], {queryParams: {nowEdit : 'add'}});
  }
  onEdit = (teacherLesson: TeacherLesson) => {
    this.teacherlessonsvr.currentLesson = teacherLesson;
    this.teacherlessonsvr.subTeacherLessonList(teacherLesson.lessonId).subscribe(
      re => {
        this.teacherlessonsvr.currentSubLessonArray = re;
        this.router.navigate(['/frame/schoolteacherworkplatform/teacherlessonsdetail'], {queryParams: {nowEdit : 'edit'}});
      }
    );
  }
  onDelete = (teacherLesson: TeacherLesson) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该套课程吗?</b>',
      nzOnOk: () => {
        this.teacherlessonsvr.deleteTeacherLesson(teacherLesson.lessonId).subscribe(
          re =>  this.onQuery()
        );
      }
    });
  }
  onHabitChoose = (habit: Habit) => {
      this.teacherlessonsvr.publishToHabit(habit.habitId, this.teacherlessonsvr.currentLesson.lessonId).subscribe(
         re => {
           if (re === 'ok') {
             this.message.create('success', MSG_SAVE_SUCCESS);
             this.onQuery();
           } else {
             this.message.create('error', MSG_SAVE_ERROR);
           }
         }
      );
  }
  onPublish = (teacherLesson: TeacherLesson) => {
    this.teacherlessonsvr.currentLesson = teacherLesson;
    this.habitChooseSign$.next({singleChoose: true, haveChoosedHabit: null});
  }

}
