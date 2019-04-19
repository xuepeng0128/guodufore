import { Component, OnInit } from '@angular/core';
import {iif, Observable, of, Subject} from 'rxjs';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {User} from '../../../entity/User';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR} from '../../../shared/SysMessage';
import {IUserQueryParams} from '../../../shared/interface/queryparams/IUserQueryParams';
import {LoginUser} from '../../../entity/LoginUser';
import {IUserQueryResult} from '../../../shared/interface/queryparams/IUserQueryResult';




@Component({
  selector: 'app-user-mgr',
  templateUrl: './user-mgr.component.html',
  styleUrls: ['./user-mgr.component.css']
})
export class UserMgrComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  isUserModalShow = false;
  userArray$: Observable<Array<IUserQueryResult>> = of([]);
  total$ = of(0);
  currentUser: User = new User({});
  editState = 'browse';
  queryParams: IUserQueryParams = {
    schoolAdmin : true,
    pageSize: 1000,
    pageNo: 1,
    pageBegin : 0
  };
  constructor(private usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = 0;
    this.userArray$ = this.usersvr.userList(this.queryParams);
    this.total$ = this.usersvr.userListTotal(this.queryParams);
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.userArray$ = this.usersvr.userList(this.queryParams);
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentUser = new User();
    this.currentUser.schoolId = '';
    this.isUserModalShow = true;
  }
  onEdit = (user: User) => {
    this.currentUser = user;
    this.editState = 'edit';
    this.isUserModalShow = true;
  }
  onSave = () => {
    this.isUserModalShow = false;
    this.userArray$ = iif(
      () => this.editState === 'add',
      this.usersvr.insertUser(this.currentUser),
      this.usersvr.updateUser(this.currentUser)
    ).pipe(
      switchMap(() =>
        this.usersvr.userList(this.queryParams)
      )
    );
    this.total$ = this.editState === 'add' ? this.total$.pipe(map(re => re + 1)) : this.total$;
  }
  // onDelete = (u: User) => {
  //   this.usersvr.deleteUser(u.account).pipe(
  //     switchMap(() => this.usersvr.userList({schoolAdmin : '1', pageSize: 1000, pageNo: 1, getTotal: '1'}))
  //   ).subscribe( re => {
  //     this.userArray = re ;
  //   });
  // }
    onResetPwd = (user: User) => {
       this.user.user.passWord = '123456';
       this.usersvr.updateUser(this.user.user).subscribe(u => {
         if (isNullOrUndefined(u)) {
            this.message.create('error', MSG_SAVE_ERROR);
         } else {
           this.message.create('success', '密码已初始');
         }
       });
    }



  }
