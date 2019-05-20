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

@Component({
  selector: 'app-teacher-article',
  templateUrl: './teacher-article.component.html',
  styleUrls: ['./teacher-article.component.css']
})
export class TeacherArticleComponent implements OnInit {
  showKindEdit = false;
  editOrder$: Subject<{order: string; htmlContent: string}> = new Subject<{order: string; htmlContent: string}>();


  nowEdit = 'browse';
  loginUser: LoginUser = this.usersvr.getUserStorage();
  queryParams: ITeacherArticleQueryParams = {
    teacherId : this.loginUser.teacher.master ? '' : this.loginUser.teacher.teacherId,
    teacherName : '',
    schoolId : this.loginUser.school.schoolId,
    schoolName : '',
    pageNo : 1,
    pageSize : 10 ,
    pageBegin : 0
  };
  articleArray: Array<ITeacherArticleQueryResult> = new Array<ITeacherArticleQueryResult>();
  currentArticle: TeacherArticle = new TeacherArticle({});
  total = 0;
  constructor(private usersvr: UserService , private  teacherarticlesvr: TeacherArticleService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.teacherarticlesvr.teacherArticleList(this.queryParams).subscribe(
          re => this.articleArray = re
       );
    this.teacherarticlesvr.teacherArticleTotal(this.queryParams).subscribe(
      re => this.total = re
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.teacherarticlesvr.teacherArticleList(this.queryParams).subscribe(
      re => this.articleArray = re
    );
  }


  onAdd = () => {
    this.nowEdit = 'add';
    this.showKindEdit = true;
    this.currentArticle = new TeacherArticle({  teacherId: this.loginUser.teacher.teacherId,
                                                             schoolId: this.loginUser.school.schoolId});
    this.editOrder$.next({order: 'setHtml', htmlContent: ''});
  }
 onEdit = (teacherArticle: ITeacherArticleQueryResult) => {
   this.nowEdit = 'edit';
   this.showKindEdit = true;
   this.currentArticle = new TeacherArticle({articleId: teacherArticle.articleId, articleTitle: teacherArticle.articleTitle, articleContent: teacherArticle.articleContent});
   this.editOrder$.next({order: 'setHtml', htmlContent: this.currentArticle.articleContent});
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
onPublish = (teacherArticle: TeacherArticle) => {

}

onSave = () => {
       this.editOrder$.next({order: 'getHtml', htmlContent: ''});

}

  receiveHtml = (html) => {
    this.currentArticle.articleContent = html;
    if (this.nowEdit === 'add') {
      this.teacherarticlesvr.insertTeacherArticle(this.currentArticle).subscribe(
         re =>   {
           this.onQuery();
           this.total += 1;
         }
      );
    } else {
      this.teacherarticlesvr.updateTeacherArticle(this.currentArticle).subscribe(
        re =>     this.onQuery()
      );
    }

    this.showKindEdit = false;
  }

}
