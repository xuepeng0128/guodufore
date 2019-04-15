import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable, of} from 'rxjs/index';
import {flatMap, map} from 'rxjs/operators';
import {User} from '../../../entity/User';
import {UserService} from '../../../shared/user.service';
import {isNullOrUndefined} from 'util';
import {MSG_DELETE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPassWord: string; // 新密码
  newPassWordAgain: string; // 确认新密码
  msg: string; // 提示
  user: User = this.usersvr.getUserStorage();

  constructor(private usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {
    this.user.passWord = '';
  }

  // 修改密码
  onUpdatePwd = () => {
   this.msg = '';
   this.onJudge();
   if (this.msg !== '') {
     return;
   }
   this.usersvr.onvalidateLogin(this.user).pipe(
     flatMap(re => {
          if (re) {
              return this.usersvr.updateUser(this.user).pipe(map(re => isNullOrUndefined(re) ? MSG_DELETE_ERROR : MSG_SAVE_SUCCESS));
          } else {
             return of('用户原密码验证错误!');
          }
     })
   ).subscribe( msg =>
     this.message.create('success', msg)
   );

  }

  // 输入判断
  onJudge = () => {
    if (this.newPassWord !== this.newPassWordAgain ) {this.msg += '新密码与确认密码不一致 '; }
  }


}
