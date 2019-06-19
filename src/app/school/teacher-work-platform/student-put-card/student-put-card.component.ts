import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {HabitService} from '../../../shared/service/business/habit.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CommonService} from '../../../shared/common.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {LoginUser} from '../../../entity/LoginUser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-put-card',
  templateUrl: './student-put-card.component.html',
  styleUrls: ['./student-put-card.component.css']
})
export class StudentPutCardComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  isCurrentStudentPutCardModalShow = false;
  habitId = '';
  putCardList: Array<{studentId: string, studentName: string , shouldputCards: number, havePutCards: number, haveGuodubi: number, haveScore: number , finished: number}>
        = new Array<{studentId: string, studentName: string, shouldputCards: number, havePutCards: number, haveGuodubi: number, haveScore: number , finished: number}>();

 currentStudentPutCards: Array<{shouldPutCardDateBegin: string , shouldPutCardDateEnd: string , canGetGuodubi: string , haveGuodubi: string , upperLimitGuodubi: number,
   canGetScore: number , haveScore: number, putCardTime: string, putCardMemo: string  , putCardPicUrls: string , putCardaudioUrls: string , putCardvideoUrls: string ,
   shouldFinish: string, haveFinish: string , finished: number }> =
   new Array<{shouldPutCardDateBegin: string, shouldPutCardDateEnd: string, canGetGuodubi: string, haveGuodubi: string,
              upperLimitGuodubi: number, canGetScore: number, haveScore: number, putCardTime: string, putCardMemo: string,
              putCardPicUrls: string, putCardaudioUrls: string, putCardvideoUrls: string, shouldFinish: string, haveFinish: string,
            finished: number}>() ;

  constructor(private usersvr: UserService, private habitsvr: HabitService, private message: NzMessageService,
              private modalService: NzModalService, private route: ActivatedRoute, private router: Router
             ) { }

  ngOnInit() {
    this.habitId = this.route.snapshot.queryParams.habitId as string;
    this.habitsvr.habitStudentPutCards(this.habitId).subscribe(
       re => this.putCardList = re
    );
  }

  onShowCurrentPutCards = (studentId: string) => {
      this.isCurrentStudentPutCardModalShow = true;
      this.habitsvr.currentStudentPutCardList(this.habitId, studentId).subscribe(
          re => this.currentStudentPutCards = re
      );
  }
  onBack = () => {
      window.history.back();
  }
}
