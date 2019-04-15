import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Classes} from '../../../entity/Classes';
import {School} from '../../../entity/School';
import {UserService} from '../../../shared/user.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {CommonService} from '../../../shared/common.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.css']
})
export class SchoolClassesComponent implements OnInit {
  user = this.usersvr.getUserStorage();
  classesWinOrder$: Subject<{nowState: string , classes: Classes}> = new Subject<{nowState: string , classes: Classes}>() ;
  classesArray$: Observable<Array<Classes>> = new Observable<Array<Classes>>();
  queryParams = {
    grade : '',
    classes : '' ,
    schoolId : this.user.teacher.onserve.school.schoolId,
    headmasterName : ''
  };
  constructor(private usersvr: UserService, private classessvr: ClassesService,
              public  commonsvr: CommonService, private message: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.classesArray$ = this.classessvr.schoolClassesList(this.queryParams);
  }

  onEdit = (classes: Classes) => {
    this.classesWinOrder$.next({nowState: 'edit', classes});
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
