import { Component, OnInit } from '@angular/core';
import {iif, Observable, of, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ISchoolQueryResult} from '../../../shared/interface/queryparams/ISchoolQueryResult';
import {ISchoolQueryParams} from '../../../shared/interface/queryparams/ISchoolQueryParams';
import {CommonService} from '../../../shared/common.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  loginUser = this.usersvr.getUserStorage();
  schoolWinOrder$: Subject<{nowState: string , school: School}> = new Subject<{nowState: string , school: School}>() ;
  schoolList: Array<ISchoolQueryResult> =  Array<ISchoolQueryResult>();
  total = 0;
  queryParams: ISchoolQueryParams = {
            schoolName : '',
            provinceId : '0',
            cityId : '0',
            districtId : '0',
            schoolStyle: '0',
            saleManId : '',
            pageSize : 10 ,
            pageNo : 1,
            pageBegin : 0
  };
  constructor(private schoolsvr: SchoolService, private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService,
              public commonsvr: CommonService) { }

  ngOnInit() {
    this.onQuery();
  }

  onQuery = () => {

    this.queryParams.pageNo = 1;
    this.queryParams.pageBegin = 0;
    this.schoolsvr.schoolList(this.queryParams).subscribe(
        re => this.schoolList = re
    );
    this.schoolsvr.schoolListTotal(this.queryParams).subscribe(
        re => this.total = re
    );
  }
  onPageChange = () => {
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.schoolsvr.schoolList(this.queryParams).subscribe(
      re => this.schoolList = re
    );
  }

onRegist = () => {
  this.schoolWinOrder$.next({nowState: 'add', school: null});
}
  onEdit = (school: ISchoolQueryResult) => {
    this.schoolWinOrder$.next({nowState: 'edit', school : school as School });

  }
onSaved = (editstate: string) => {





  this.schoolsvr.schoolList(this.queryParams).subscribe(
    re => this.schoolList = re
  );
  if ( editstate === 'add') {
         this.total += 1;
  }
  }
onDelete = (school: ISchoolQueryResult) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {

     this.schoolsvr.deleteSchool(school.schoolId).subscribe(re => {
          this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
          this.schoolsvr.schoolList(this.queryParams).subscribe(
            res => this.schoolList = res
          );
          this.total -= 1;
        });
      }
    });

  }
}
