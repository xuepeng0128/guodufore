import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/User';
import {StudySubject} from '../../../entity/StudySubject';
import {UserService} from '../../../shared/user.service';
import {StudySubjectService} from '../../../shared/service/dic/study-subject.service';
import {iif} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {School} from '../../../entity/School';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-school-admin-mgr',
  templateUrl: './school-admin-mgr.component.html',
  styleUrls: ['./school-admin-mgr.component.css']
})
export class SchoolAdminMgrComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  isUserModalShow = false;
  userArray: Array<User> = new Array<User>();
  currentUser: User = new User({manageSchool : new School()});
  editState = 'browse';
  constructor(private usersvr: UserService, private message: NzMessageService) { }

  ngOnInit() {
  }
  onQuery = () => {
    this.usersvr.userList({schoolAdmin : '1', pageSize: 1000, pageNo: 1, getTotal: '1'}).subscribe(re => {
      this.userArray = re;
    });
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentUser = new User();
    this.currentUser.manageSchool = new School();
    this.isUserModalShow = true;
  }
  onEdit = (user: User) => {
    this.currentUser = user;
    this.editState = 'edit';
    this.isUserModalShow = true;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
      this.usersvr.insertUser(this.currentUser),
      this.usersvr.updateUser(this.currentUser)
    ).subscribe(re => this.isUserModalShow = false);
  }
  onDelete = (u: User) => {
    this.usersvr.deleteUser(u.account).pipe(
      switchMap(() => this.usersvr.userList({schoolAdmin : '1', pageSize: 1000, pageNo: 1, getTotal: '1'}))
    ).subscribe( re => {
      this.userArray = re ;
    });
  }
}
