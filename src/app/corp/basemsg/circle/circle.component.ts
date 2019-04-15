import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Circle} from '../../../entity/Circle';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../entity/User';
import {flatMap, map} from 'rxjs/operators';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CommonService} from '../../../shared/common.service';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  queryParams = {
    schoolstyle : '0', // 1.全日制学校,2.培训学校
    schoolName : '',
    circleName : '',
    buildDateBegin : '',
    buildDateEnd : '',
    queryPaperId : this.user.supperAdmin ?  '' : (this.user.employee.duty.master ?  '' : this.user.employee.paperId) ,
    pageSize : 20,
    pageNo : 1,
    getTotal : '1'
  };
  circleList$: Observable<Array<Circle>> = new Observable<Array<Circle>>();
  total = 0;
  constructor(private usersvr: UserService, private circlesvr: CircleService, private modalService: NzModalService,
              private message: NzMessageService, public commonsvr : CommonService) { }

  ngOnInit() {
  }

  onQuery = () => {
    this.queryParams.getTotal = '1';
    this.circleList$ = this.circlesvr.allCircleList(this.queryParams).pipe(
      map( re => {
        this.total = re.total;
        return re.list ;
      })
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.getTotal = '0';
    this.circleList$ = this.circlesvr.allCircleList(this.queryParams).pipe(
      map( re => re.list)
    );
  }



  onCloseCircle = (circle: Circle) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定关闭圈子吗?</b>',
      nzOnOk: () => {
        circle.closeMan = this.user.account;
        this.circlesvr.updateCircle(circle).subscribe(
           re => {
             if (re) {
               this.message.create('success', '圈子已关闭!');
             } else {
               this.message.create('error', `圈子未正常关闭!${re}`);
             }
           }
         );
      }
    });
  }
}
