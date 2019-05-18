import { Component, OnInit } from '@angular/core';
import {LoginUser} from "../../../entity/LoginUser";
import {ICircleQueryParams} from "../../../shared/interface/queryparams/ICircleQueryParams";
import {UserService} from "../../../shared/user.service";
import {CircleService} from "../../../shared/service/business/circle.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../shared/common.service";
import {map} from "rxjs/operators";
import {Circle} from "../../../entity/Circle";

@Component({
  selector: 'app-classes-circle',
  templateUrl: './classes-circle.component.html',
  styleUrls: ['./classes-circle.component.css']
})
export class ClassesCircleComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  queryParams : ICircleQueryParams = {
    circleTitle :'', // 圈子名称
  schoolId : this.user.school.schoolId,
  classesId  :  '0', // 班级编号
  grade : 0 ,
  classes : 0,
  buildTeacherId : this.user.teacher.master ?  '': this.user.teacher.teacherId  ,// 建圈老师id
  pageSize : 10,
  pageNo : 1 ,
  pageBegin : 0
};
  circleArray : Array<Circle> = new Array<Circle>();
  total =0;
  constructor(private usersvr: UserService, private circlesvr: CircleService, private modalService: NzModalService,
              private message: NzMessageService, public commonsvr : CommonService) { }

  onQuery = () => {
    this.queryParams.pageBegin=0;
    this.queryParams.pageSize=1;
    this.circlesvr.circleList(this.queryParams).subscribe(
        re => this.circleArray=re
    );
    this.circlesvr.circleListTotal(this.queryParams).subscribe(
          re => this.total=re
    );
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.pageBegin= (this.queryParams.pageNo-1) * this.queryParams.pageSize;
    this.circlesvr.circleList(this.queryParams).subscribe(
      re => this.circleArray=re
    );
  }

onEdit =(circle : Circle) =>{

}

onDelete =(circle : Circle) =>{

}
  onCloseCircle = (circle: Circle) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定关闭圈子吗?</b>',
      nzOnOk: () => {
        this.circlesvr.closeCircle(this.user.teacher.teacherName,'').subscribe(
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

  ngOnInit(): void {
  }
}
