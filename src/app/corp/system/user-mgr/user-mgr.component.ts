import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {User} from '../../../entity/User';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR} from '../../../shared/SysMessage';
import {IUserList} from '../../../shared/interface/IUserList';
import {IUserQueryParams} from '../../../shared/interface/queryparams/IUserQueryParams';



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
  queryParams: IUserQueryParams = {
  account: '',
  employeeName: '',
  kind: '1',
  pageSize : 20,
  pageNo : 1,
  pageBegin : 0
};
  userArray$: Observable<Array<IUserList>> = new Observable<Array<IUserList>>();
  total$ = of(0);
  constructor(private usersvr: UserService , private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
   this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = 0;
    this.userArray$ = this.usersvr.userList(this.queryParams);

  }
  onPageChange = (e) => {
    this.queryParams.pageNo=e;
    this.queryParams.pageBegin= this.queryParams.pageSize * (this.queryParams.pageNo-1);
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
