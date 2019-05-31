import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {ITeacherArticleQueryResult} from '../../../shared/interface/queryparams/ITeacherArticleQueryResult';
import {ITeacherArticleQueryParams} from '../../../shared/interface/queryparams/ITeacherArticleQueryParams';
import {TeacherArticleService} from '../../../shared/service/business/teacher-article.service';
import {Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {TeacherArticle} from '../../../entity/TeacherArticle';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {Habit} from '../../../entity/Habit';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-teacher-article',
  templateUrl: './teacher-article.component.html',
  styleUrls: ['./teacher-article.component.css']
})
export class TeacherArticleComponent implements OnInit {
  habitChooseSign$: Subject<{ singleChoose: boolean, haveChoosedHabit: Array<Habit>}>
    = new Subject<{ singleChoose: boolean, haveChoosedHabit: Array<Habit>}>();
  loginUser: LoginUser = this.usersvr.getUserStorage();
  articleArray: Array<ITeacherArticleQueryResult> = new Array<ITeacherArticleQueryResult>();
  currentArticle: TeacherArticle = new TeacherArticle({});
  total = 0;
  constructor(private usersvr: UserService , public  teacherarticlesvr: TeacherArticleService,
              private modalService: NzModalService, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.teacherarticlesvr.queryParams.teacherId = this.loginUser.teacher.master ? '' : this.loginUser.teacher.teacherId;
    this.teacherarticlesvr.queryParams.schoolId = this.loginUser.school.schoolId;
    this.teacherarticlesvr.teacherArticleList(this.teacherarticlesvr.queryParams).subscribe(
      re => this.articleArray = re
    );
    this.teacherarticlesvr.teacherArticleTotal(this.teacherarticlesvr.queryParams).subscribe(
      re => this.total = re
    );
  }
  onQuery = () => {
    this.teacherarticlesvr.queryParams.pageNo = 1;
    this.teacherarticlesvr.queryParams.pageBegin = (this.teacherarticlesvr.queryParams.pageNo - 1) * this.teacherarticlesvr.queryParams.pageSize;
    this.teacherarticlesvr.teacherArticleList(this.teacherarticlesvr.queryParams).subscribe(
          re => this.articleArray = re
       );
    this.teacherarticlesvr.teacherArticleTotal(this.teacherarticlesvr.queryParams).subscribe(
      re => this.total = re
    );
  }
  onPageChange = (e) => {
    this.teacherarticlesvr.queryParams.pageNo = e;
    this.teacherarticlesvr.queryParams.pageBegin = (this.teacherarticlesvr.queryParams.pageNo - 1) * this.teacherarticlesvr.queryParams.pageSize;
    this.teacherarticlesvr.teacherArticleList(this.teacherarticlesvr.queryParams).subscribe(
      re => this.articleArray = re
    );
  }


  onAdd = () => {
       this.teacherarticlesvr.currentArticle = new TeacherArticle({
       teacherId: this.loginUser.teacher.teacherId,
       schoolId : this.loginUser.school.schoolId
     });
       this.router.navigate(['/frame/schoolteacherworkplatform/teacherarticledetail'], {queryParams: {nowEdit : 'add'}});

  }
 onEdit = (teacherArticle: ITeacherArticleQueryResult) => {

   this.teacherarticlesvr.currentArticle = new TeacherArticle({articleId: teacherArticle.articleId, articleTitle: teacherArticle.articleTitle, articleContent: teacherArticle.articleContent});
   this.router.navigate(['/frame/schoolteacherworkplatform/teacherarticledetail'], {queryParams: {nowEdit : 'edit' }});
 }
onDelete = (teacherArticle: TeacherArticle) => {
  this.modalService.confirm({
    nzTitle: '<i>提示</i>',
    nzContent: '<b>确定删除该文章吗?</b>',
    nzOnOk: () => {
      this.teacherarticlesvr.deleteTeacherArticle(teacherArticle.articleId).subscribe(
         re =>  this.onQuery()
      );
    }
  });
}
  onHabitChoose = (habit: Habit) => {
    this.teacherarticlesvr.publishToHabit(habit.habitId, this.teacherarticlesvr.currentArticle.articleId).subscribe(
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
onPublish = (teacherArticle: TeacherArticle) => {
  this.teacherarticlesvr.currentArticle = teacherArticle;
  this.habitChooseSign$.next({singleChoose: true, haveChoosedHabit: null});
}


}
