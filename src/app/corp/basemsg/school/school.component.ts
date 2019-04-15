import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {UserService} from '../../../shared/user.service';
import {flatMap, map} from 'rxjs/operators';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  user = this.usersvr.getUserStorage();
  schoolWinOrder$: Subject<{nowState: string , school: School}> = new Subject<{nowState: string , school: School}>() ;
  schoolList$: Observable<Array<School>> = new Observable<Array<School>>();
  total = 0;
  queryParams = {
     schoolId : '',
    schoolName : '',
    districtId : '',
     address : '',
     employeeName : '',
    pageSize : 20,
    pageNo : 1,
    getTotal : '1'
  };
  constructor(private schoolsvr: SchoolService, private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
  }

  onQuery = () => {
    this.queryParams.getTotal = '1';
    this.schoolList$ = this.schoolsvr.schoolList(this.queryParams).pipe(
      map( re => {
        this.total = re.total;
        return re.list ;
      })
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.getTotal = '0';
    this.schoolList$ = this.schoolsvr.schoolList(this.queryParams).pipe(
      map( re => re.list)
    );
  }

onRegist = () => {
  this.schoolWinOrder$.next({nowState: 'add', school: null});
}
  onEdit = (school: School) => {
    this.schoolWinOrder$.next({nowState: 'edit', school});
  }
  onSaved = (school: School) => {
    this.schoolList$ = this.schoolsvr.schoolList(this.queryParams).pipe(
      map( re => re.list)
    );
  }
  onDelete = (school: School) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
       this.schoolList$ =  this.schoolsvr.deleteSchool(school).pipe(
          flatMap(re => this.schoolsvr.schoolList(this.queryParams))
        ).pipe(
         map( re => {
           this.total = re.total;
           return re.list ;
         })
       );
      }
    });
  }
}
