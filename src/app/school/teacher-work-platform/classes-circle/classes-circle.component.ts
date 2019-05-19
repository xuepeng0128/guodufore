import { Component, OnInit } from '@angular/core';
import {LoginUser} from "../../../entity/LoginUser";
import {ICircleQueryParams} from "../../../shared/interface/queryparams/ICircleQueryParams";
import {UserService} from "../../../shared/user.service";
import {CircleService} from "../../../shared/service/business/circle.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../shared/common.service";
import {map} from "rxjs/operators";
import {Circle} from "../../../entity/Circle";
import {Subject} from "rxjs";
import {School} from "../../../entity/School";
import {ClassesService} from "../../../shared/service/basemsg/classes.service";
import {Classes} from "../../../entity/Classes";

@Component({
  selector: 'app-classes-circle',
  templateUrl: './classes-circle.component.html',
  styleUrls: ['./classes-circle.component.css']
})
export class ClassesCircleComponent implements OnInit {
  circleWinOrder$: Subject<{nowState: string , circle: Circle,teacherTeachedClasses : Array<Classes>}>
    = new Subject<{nowState: string , circle: Circle,teacherTeachedClasses : Array<Classes>}>();
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
  teacherTeachedClasses :Array<Classes> = new Array<Classes>();
  constructor(private usersvr: UserService, private circlesvr: CircleService,
              private modalService: NzModalService,
              private message: NzMessageService, public commonsvr : CommonService,
              private classessvr : ClassesService) { }
  ngOnInit(): void {
    this.classessvr.teacherTeachedClasses(this.user.teacher.teacherId,this.user.school.schoolId,this.user.school.schoolStyle).subscribe(
      re => {
        this.teacherTeachedClasses=re;
      }
    );
    this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageBegin=0;
    this.queryParams.pageSize=10;
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
onAdd=()=>{
  this.circleWinOrder$.next({nowState: 'add', circle: null, teacherTeachedClasses : this.teacherTeachedClasses });
}
onEdit =(circle : Circle) =>{
  this.circleWinOrder$.next({nowState: 'edit', circle : circle, teacherTeachedClasses : this.teacherTeachedClasses  });
}

onDelete =(circle : Circle) =>{
  this.modalService.confirm({
    nzTitle: '<i>提示</i>',
    nzContent: '<b>确定删除该数据吗?</b>',
    nzOnOk: () => {

      this.circlesvr.deleteCircle(circle).subscribe(re => {
        this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
        this.circlesvr.circleList(this.queryParams).subscribe(
          res => this.circleArray = res
        );
        this.total -= 1;
      });
    }
  });
}

 circleSaved=(editstate : string) =>{
   this.circlesvr.circleList(this.queryParams).subscribe(
     res => this.circleArray = res
   );
   if ( editstate === 'add') {
     this.total += 1;
   }
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


}
