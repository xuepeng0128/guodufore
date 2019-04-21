import { Component, OnInit } from '@angular/core';
import {iif, Observable, of, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {UserService} from '../../../shared/user.service';
import {flatMap, map} from 'rxjs/operators';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ISchoolQueryResult} from '../../../shared/interface/queryparams/ISchoolQueryResult';
import {ISchoolQueryParams} from '../../../shared/interface/queryparams/ISchoolQueryParams';
import {CommonService} from '../../../shared/common.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  loginUser = this.usersvr.getUserStorage();
  schoolWinOrder$: Subject<{nowState: string , school: School}> = new Subject<{nowState: string , school: School}>() ;
  schoolList$: Observable<Array<ISchoolQueryResult>> = of(new Array<ISchoolQueryResult>());
  total$: Observable<number> = of(0);
  queryParams: ISchoolQueryParams = {
            schoolName : '',
            cityId : '0',
            districtId : '0',
            schoolStyle: '0',
            saleManId : '',
            pageSize : 20 ,
            pageNo : 1,
            pageBegin : 0
  };
  constructor(private schoolsvr: SchoolService, private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService,
              public commonsvr: CommonService) { }

  ngOnInit() {
  }

  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = 0;
    this.schoolList$ = this.schoolsvr.schoolList(this.queryParams);
    this.total$ = this.schoolsvr.schoolListTotal(this.queryParams);
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.schoolList$ = this.schoolsvr.schoolList(this.queryParams);
  }

onRegist = () => {
  this.schoolWinOrder$.next({nowState: 'add', school: null});
}
  onEdit = (school: ISchoolQueryResult) => {
    this.schoolWinOrder$.next({nowState: 'edit', school : school as School });

  }
onSaved = (editstate: string) => {
    this.schoolList$ = this.schoolsvr.schoolList(this.queryParams);
    this.total$ = iif( () => editstate === 'add',
                         this.total$.pipe(map(total => total + 1)),
                         this.total$
      );
  }
onDelete = (school: ISchoolQueryResult) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
       this.schoolList$ =  this.schoolsvr.deleteSchool(school.schoolId).pipe(
          flatMap(re => {
                this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
                return  this.schoolsvr.schoolList(this.queryParams);
          })
        );
       this.total$ = this.total$.pipe(map(total => total - 1));
      }
    });
  }
}
