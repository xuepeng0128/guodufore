import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {LoginUser} from '../../../entity/LoginUser';
import {ITeacherArticleQueryParams} from '../../../shared/interface/queryparams/ITeacherArticleQueryParams';
import {ITeacherArticleQueryResult} from '../../../shared/interface/queryparams/ITeacherArticleQueryResult';
import {TeacherArticle} from '../../../entity/TeacherArticle';
import {UserService} from '../../../shared/user.service';
import {TeacherArticleService} from '../../../shared/service/business/teacher-article.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ITeacherLessonQueryParams} from '../../../shared/interface/queryparams/ITeacherLessonQueryParams';
import {TeacherLesson} from '../../../entity/TeacherLesson';
import {TeacherLessonService} from '../../../shared/service/business/teacher-lesson.service';
import {SubTeacherLesson} from '../../../entity/SubTeacherLesson';

@Component({
  selector: 'app-teacher-lessons',
  templateUrl: './teacher-lessons.component.html',
  styleUrls: ['./teacher-lessons.component.css']
})
export class TeacherLessonsComponent implements OnInit {
  showKindEdit = false;
  editOrder$: Subject<{order: string; htmlContent: string}> = new Subject<{order: string; htmlContent: string}>();


  nowEdit = 'browse';
  loginUser: LoginUser = this.usersvr.getUserStorage();
  queryParams: ITeacherLessonQueryParams = {
    teacherId : this.loginUser.teacher.master ? '' : this.loginUser.teacher.teacherId,
    teacherName : '',
    schoolId : this.loginUser.school.schoolId,
    schoolName : '',
    pageNo : 1,
    pageSize : 10 ,
    pageBegin : 0
  };
  lessonArray: Array<TeacherLesson> = new Array<TeacherLesson>();

  currentLesson: TeacherLesson = new TeacherLesson({});
  currentSubLessonArray: Array<SubTeacherLesson> = new Array<SubTeacherLesson>();
  nowEditSubLesson: SubTeacherLesson = new SubTeacherLesson({});
  total = 0;
  constructor(private usersvr: UserService , private  teacherlessonsvr: TeacherLessonService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.teacherlessonsvr.teacherLessonList(this.queryParams).subscribe(
      re => this.lessonArray = re
    );
    this.teacherlessonsvr.teacherLessonListTotal(this.queryParams).subscribe(
      re => this.total = re
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.teacherlessonsvr.teacherLessonList(this.queryParams).subscribe(
      re => this.lessonArray = re
    );
  }


  onAdd = () => {
    this.nowEdit = 'add';
    this.showKindEdit = true;
    const lessonId = this.teacherlessonsvr.makeLessonId();
    this.currentLesson = new TeacherLesson({lessonId,  teacherId: this.loginUser.teacher.teacherId,
      schoolId: this.loginUser.school.schoolId, guoduCoin: 0});
    this.currentSubLessonArray = new Array<SubTeacherLesson>();
    this.nowEditSubLesson = new SubTeacherLesson({lessonId, lessonNo : 1 , noPay: true });
    this.editOrder$.next({order: 'setHtml', htmlContent: ''});
  }
  onEdit = (teacherLesson: TeacherLesson) => {
    this.nowEdit = 'edit';
    this.showKindEdit = true;
    this.currentLesson = teacherLesson;
    this.teacherlessonsvr.subTeacherLessonList(teacherLesson.lessonId).subscribe(
      re => {
        this.currentSubLessonArray = re;
        this.nowEditSubLesson = this.currentSubLessonArray[0];
        this.editOrder$.next({order: 'setHtml', htmlContent:  this.nowEditSubLesson.memo});
      }
    );
  }
  onDelete = (teacherLesson: TeacherLesson) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该文章吗?</b>',
      nzOnOk: () => {
        this.teacherlessonsvr.deleteTeacherLesson(teacherLesson.lessonId).subscribe(
          re =>  this.onQuery()
        );
      }
    });
  }
  onPublish = (teacherArticle: TeacherArticle) => {

  }

  onSave = () => {
    this.editOrder$.next({order: 'getHtml', htmlContent: ''});
  }

  receiveHtml = (html) => {
    this.nowEditSubLesson.memo = html;
    this.teacherlessonsvr.saveTeacherLesson({teacherLesson: this.currentLesson, subTeacherLessons: this.currentSubLessonArray}).subscribe(
        re =>   {
          this.onQuery();
          this.total += 1;
        }
      );
    this.showKindEdit = false;
  }




}
