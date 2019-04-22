import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Classes} from '../../../entity/Classes';
import {School} from '../../../entity/School';
import {UserService} from '../../../shared/user.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {CommonService} from '../../../shared/common.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {IClassQueryResult} from '../../../shared/interface/queryparams/IClassQueryResult';
import {IClassQueryParams} from '../../../shared/interface/queryparams/IClassQueryParams';
import {LoginUser} from '../../../entity/LoginUser';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.css']
})
export class SchoolClassesComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  classesWinOrder$: Subject<{nowState: string , classesId: string}> = new Subject<{nowState: string , classesId: string}>() ;
  classesArray$: Observable<Array<IClassQueryResult>> = of(new Array<IClassQueryResult>());
  total$ = of(0);
  queryParams: IClassQueryParams = {
    grade : 0,
  classes : 0 ,
  schoolId : this.loginUser.school.schoolId,
  schoolName : '',
  pageSize : 10,
  pageNo  : 1,
  pageBegin : 0
  };
  constructor(private usersvr: UserService, private classessvr: ClassesService,
              public  commonsvr: CommonService, private message: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = 0;
    this.classesArray$ = this.classessvr.classesList(this.queryParams);
    this.total$ = this.classessvr.classListTotal(this.queryParams);
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.classesArray$ = this.classessvr.classesList(this.queryParams);
  }
  onAdd = () => {
    this.classesWinOrder$.next({nowState: 'add', classesId : null});
  }
  onEdit = (classes: IClassQueryResult) => {
    this.classesWinOrder$.next({nowState: 'edit', classesId : classes.classesId});
  }
  onSaved = (classes: Classes) => {
    this.classesArray$ = this.classessvr.schoolClassesList(this.queryParams);
  }
  onDelete = (classes: Classes) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.classesArray$ =  this.classessvr.deleteClasses(classes).pipe(
          switchMap(() => this.classessvr.schoolClassesList(this.queryParams))
        );
      }
    });
  }


}
