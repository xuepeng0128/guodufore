import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {User} from '../../../entity/User';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR} from '../../../shared/SysMessage';
import {HabitService} from '../../../shared/service/basemsg/habit.service';


@Component({
  selector: 'app-user-mgr',
  templateUrl: './user-mgr.component.html',
  styleUrls: ['./user-mgr.component.css']
})
export class UserMgrComponent implements OnInit {
  user = this.usersvr.getUserStorage();
  userEditModelShow = false;
  currentUser: User = new User({});
  editState: 'browse' | 'add' | 'edit' = 'browse';
  queryParams = {
    account : '',
    employeeName : ''
  };
  userArray$: Observable<Array<User>> = new Observable<Array<User>>();
  total = 0;
  constructor(private usersvr: UserService , private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {

  }
  onQuery = () => {
    this.userArray$ = this.usersvr.userList(this.queryParams);
  }

  onRegist = () => {

  }

  onSaved = () => {

  }
  onDelete = (ur: User) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.userArray$ = this.usersvr.deleteUser(ur.account).pipe(
          switchMap(() => this.usersvr.userList(this.queryParams))
        );
      }
    });
  }
    onResetPwd = (user: User) => {
       user.passWord = '123456';
       this.usersvr.updateUser(this.user).subscribe(u => {
         if (isNullOrUndefined(u)) {
            this.message.create('error', MSG_SAVE_ERROR);
         } else {
           this.message.create('success', '密码已初始');
         }
       });
    }



  }
