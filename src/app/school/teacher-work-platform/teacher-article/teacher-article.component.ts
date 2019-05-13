import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {ITeacherArticleQueryResult} from '../../../shared/interface/queryparams/ITeacherArticleQueryResult';
import {ITeacherArticleQueryParams} from '../../../shared/interface/queryparams/ITeacherArticleQueryParams';
import {TeacherArticleService} from '../../../shared/service/business/teacher-article.service';
import {Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {TeacherArticle} from '../../../entity/TeacherArticle';

@Component({
  selector: 'app-teacher-article',
  templateUrl: './teacher-article.component.html',
  styleUrls: ['./teacher-article.component.css']
})
export class TeacherArticleComponent implements OnInit {
  teacherArticleWinOrder$: Subject<{nowState: string , teacherArticle: TeacherArticle}>
   = new Subject<{nowState: string , teacherArticle: TeacherArticle}>() ;


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
  total = 0;
  constructor(private usersvr: UserService , private  teacherarticlesvr: TeacherArticleService) { }

  ngOnInit() {
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
     this.teacherArticleWinOrder$.next({nowState : 'add', teacherArticle : null});
  }
 onEdit = (teacherArticle: TeacherArticle) => {
   this.teacherArticleWinOrder$.next({nowState : 'add', teacherArticle});
 }
onDelete = (teacherArticle: TeacherArticle) => {

}
onPublish = (teacherArticle: TeacherArticle) => {

}

onSaved = () => {
      this.onQuery();
}



}
