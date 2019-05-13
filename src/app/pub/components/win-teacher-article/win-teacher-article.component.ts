import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {iif, Subject} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {NzMessageService} from 'ng-zorro-antd';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {UserService} from '../../../shared/user.service';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {TeacherArticle} from '../../../entity/TeacherArticle';
import {TeacherArticleService} from '../../../shared/service/business/teacher-article.service';

@Component({
  selector: 'app-win-teacher-article',
  templateUrl: './win-teacher-article.component.html',
  styleUrls: ['./win-teacher-article.component.css']
})
export class WinTeacherArticleComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  @Input() teacherArticleWinOrder$: Subject<{nowState: string , teacherArticle: TeacherArticle}> ;
  @Output() onArticleSaved: EventEmitter<string> = new EventEmitter<string>();

  editOrder$: Subject<{order: string; htmlContent: string}> = new Subject<{order: string; htmlContent: string}>();
  currentArticle: TeacherArticle = new TeacherArticle({

  });
  isTeacherArticleModalShow = false;
  nowState = 'browse';
  constructor( private message: NzMessageService,
               private teacherarticlesvr: TeacherArticleService, private usersvr: UserService) { }

  ngOnInit() {

    this.teacherArticleWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        this.currentArticle = new TeacherArticle({
          schoolId : this.loginUser.school.schoolId,
          teacherId : this.loginUser.teacher.teacherId
        });
      } else if (re.nowState === 'edit') {
        this.currentArticle = re.teacherArticle;
      }
      this.isTeacherArticleModalShow = true;
      this.nowState = re.nowState;
    });
  }

  onSave = () => {
     this.editOrder$.next({order: 'getHtml', htmlContent: ''});
     setTimeout(() => {
       // 补全school区，teacher
       iif (() => this.nowState === 'add',
         this.teacherarticlesvr.insertTeacherArticle(this.currentArticle),
         this.teacherarticlesvr.updateTeacherArticle(this.currentArticle)
       ).subscribe(
         re => {
           if (re === 'ok') {
             this.message.create('success', MSG_SAVE_SUCCESS);
             this.onArticleSaved.emit(re);
             this.isTeacherArticleModalShow = false;
           } else {
             this.message.create('error', MSG_SAVE_ERROR);
           }
         });

     }, 500);

  }

  htmlTextChanged = (e) => {
     this.currentArticle.articleContent = e;
  }
}
