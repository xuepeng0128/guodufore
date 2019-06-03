import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/User';
import {UserService} from '../../../shared/user.service';

import {iif, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginUser} from '../../../entity/LoginUser';
import {IUserQueryResult} from '../../../shared/interface/queryparams/IUserQueryResult';
import {IUserQueryParams} from '../../../shared/interface/queryparams/IUserQueryParams';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-school-admin-mgr',
  templateUrl: './school-admin-mgr.component.html',
  styleUrls: ['./school-admin-mgr.component.css']
})
export class SchoolAdminMgrComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  isSchoolAdminModalShow = false;
  userArray: Array<IUserQueryResult> = new Array<IUserQueryResult>();
  total = 0 ;
  currentUser: User = new User({});
  editState = 'browse';
  queryParams: IUserQueryParams = {
    schoolAdmin : true,
    pageSize: 10,
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
    this.usersvr.userList(this.queryParams).subscribe(
      re => this.userArray = re
    );
    this.usersvr.userListTotal(this.queryParams).subscribe(
       re => this.total = re
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.usersvr.userList(this.queryParams).subscribe(
      re => this.userArray = re
    );
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentUser = new User({schoolAdmin : true});
    this.currentUser.schoolId = '0';
    this.currentUser.account = '';
    this.currentUser.kind = 2;
    this.isSchoolAdminModalShow = true;
  }
  onEdit = (user: User) => {
    this.currentUser = user;
    this.editState = 'edit';
    this.isSchoolAdminModalShow = true;
  }
  onSave = () => {

    // 验证
    this.message.remove();
    if (this.currentUser.account === '') {
      this.message.create('error', '请输入账号'); return;
    }

    if (this.currentUser.schoolId === '0') {
      this.message.create('error', '请选择学校!'); return;
    }



    this.usersvr.findUserAcount(this.currentUser.account, this.currentUser.userId).subscribe(
             re => {
                   if (re ) {
                     this.message.create('error', '账号已存在!'); return;
                   } else {

                     this.isSchoolAdminModalShow = false;
                      iif(
                       () => this.editState === 'add',
                       this.usersvr.insertUser(this.currentUser),
                       this.usersvr.updateUser(this.currentUser)
                     ).pipe(
                       switchMap(() =>
                         this.usersvr.userList(this.queryParams)
                       )
                     ).subscribe(
                        re => this.userArray = re
                     );
                     this.total = this.editState === 'add' ? this.total+1 : this.total;

                   }

             }
          );



  }








  // onDelete = (u: User) => {
  //   this.usersvr.deleteUser(u.account).pipe(
  //     switchMap(() => this.usersvr.userList({schoolAdmin : '1', pageSize: 1000, pageNo: 1, getTotal: '1'}))
  //   ).subscribe( re => {
  //     this.userArray = re ;
  //   });
  // }
}
