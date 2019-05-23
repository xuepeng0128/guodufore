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
  nowlessonNo = 1;
  total = 0;
  loading = false;
  toSave=false;
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
    this.toSave=false;
    this.nowEdit = 'add';
    this.showKindEdit = true;
    const lessonId = this.teacherlessonsvr.makeLessonId();
    this.currentLesson = new TeacherLesson({lessonId,  makeTeacherId: this.loginUser.teacher.teacherId,
      schoolId: this.loginUser.school.schoolId, guoduCoin: 0});
    this.currentSubLessonArray = new Array<SubTeacherLesson>();
    this.nowlessonNo=1;
    this.currentSubLessonArray.push(new SubTeacherLesson({lessonId : this.currentLesson.lessonId,
      lessonNo : this.currentSubLessonArray.length + 1, noPay: true,mode :1 }));
    this.nowEditSubLesson = this.currentSubLessonArray[0];
    this.editOrder$.next({order: 'setHtml', htmlContent: ''});
  }
  onEdit = (teacherLesson: TeacherLesson) => {
    this.toSave=false;
    this.nowEdit = 'edit';
    this.showKindEdit = true;
    this.currentLesson = teacherLesson;
    this.teacherlessonsvr.subTeacherLessonList(teacherLesson.lessonId).subscribe(
      re => {
        this.currentSubLessonArray = re;
        this.nowEditSubLesson = this.currentSubLessonArray[0];
        this.nowlessonNo=1;
        this.editOrder$.next({order: 'setHtml', htmlContent:  this.nowEditSubLesson.memo});
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

  onAddLesson = () => {
     this.editOrder$.next({order: 'getHtml', htmlContent: ''});
     this.currentSubLessonArray.push( new SubTeacherLesson({lessonId : this.currentLesson.lessonId,
       lessonNo : this.currentSubLessonArray.length + 1, noPay: true,mode :1 }));
     this.nowEditSubLesson = this.currentSubLessonArray[this.currentSubLessonArray.length-1];
     this.nowlessonNo = this.currentSubLessonArray.length;
     this.editOrder$.next({order: 'setHtml', htmlContent:  ''});
  }
onRemoveLesson = () => {
  this.modalService.confirm({
    nzTitle: '<i>提示</i>',
    nzContent: '<b>确定删除这一课时吗?</b>',
    nzOnOk: () => {
       this.currentSubLessonArray = this.currentSubLessonArray.filter(o => o.lessonNo !== this.nowEditSubLesson.lessonNo);
       if (this.currentSubLessonArray.length === 0) {
          this.onAddLesson();
       } else {
          this.nowEditSubLesson = this.currentSubLessonArray.filter(o => o.lessonNo === this.nowlessonNo--)[0];
          this.editOrder$.next({order: 'setHtml', htmlContent:  this.nowEditSubLesson.memo});
       }
    }
  });
}

onSelectLessonNoChange = () => {
    this.editOrder$.next({order: 'getHtml', htmlContent: ''});
    this.nowEditSubLesson = this.currentSubLessonArray.filter(o => o.lessonNo === this.nowlessonNo)[0];
}
  onPublish = (teacherLesson: TeacherLesson) => {

  }

  onSave = () => {
    this.toSave=true;
    this.editOrder$.next({order: 'getHtml', htmlContent: ''});
  }

  receiveHtml = (html) => {
    this.nowEditSubLesson.memo = html;
    if (this.toSave){
      this.teacherlessonsvr.saveTeacherLesson({teacherLesson: this.currentLesson, subTeacherLessons: this.currentSubLessonArray}).subscribe(
        re =>   {
          this.onQuery();
          this.total += 1;
        }
      );
      this.showKindEdit = false;
    }
  }

  handlevideoChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.nowEditSubLesson.videoUrl = info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }
  handleaudioChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.nowEditSubLesson.audioUrl = info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }

}
