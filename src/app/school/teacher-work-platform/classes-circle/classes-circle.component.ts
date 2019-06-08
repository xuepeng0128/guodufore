import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {ICircleQueryParams} from '../../../shared/interface/queryparams/ICircleQueryParams';
import {UserService} from '../../../shared/user.service';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CommonService} from '../../../shared/common.service';
import {map} from 'rxjs/operators';
import {Circle} from '../../../entity/Circle';

import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {Classes} from '../../../entity/Classes';
import {TeacherArticle} from '../../../entity/TeacherArticle';
import {Router} from '@angular/router';

@Component({
  selector: 'app-classes-circle',
  templateUrl: './classes-circle.component.html',
  styleUrls: ['./classes-circle.component.css']
})
export class ClassesCircleComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();

  circleArray: Array<Circle> = new Array<Circle>();
  total = 0;
  constructor(private usersvr: UserService, public circlesvr: CircleService,
              private modalService: NzModalService,
              private message: NzMessageService, public commonsvr: CommonService,
              private classessvr: ClassesService , private  router: Router) { }
  ngOnInit(): void {
    this.circlesvr.queryParams.schoolId = this.user.school.schoolId;
    this.circlesvr.queryParams. buildTeacherId = this.user.teacher.master ?  '' : this.user.teacher.teacherId ; // 建圈老师id

    this.circlesvr.circleList(this.circlesvr.queryParams).subscribe(
      re => this.circleArray = re
    );
    this.circlesvr.circleListTotal(this.circlesvr.queryParams).subscribe(
      re => this.total = re
    );
  }
  onQuery = () => {
    this.circlesvr.queryParams.pageBegin = 0;
    this.circlesvr.queryParams.pageSize = 10;
    this.circlesvr.circleList(this.circlesvr.queryParams).subscribe(
        re => this.circleArray = re
    );
    this.circlesvr.circleListTotal(this.circlesvr.queryParams).subscribe(
          re => this.total = re
    );
  }
  onPageChange = () => {
    this.circlesvr.queryParams.pageBegin = (this.circlesvr.queryParams.pageNo - 1) * this.circlesvr.queryParams.pageSize;
    this.circlesvr.circleList(this.circlesvr.queryParams).subscribe(
      re => this.circleArray = re
    );
  }
onAdd = () => {
  this.circlesvr.currentCircle = new Circle({
    schoolId: this.user.school.schoolId,
    classesId: '',
    buildTeacherId: this.user.teacher.teacherId });
  this.router.navigate(['/frame/schoolteacherworkplatform/classescircledetail'], {queryParams: {nowEdit : 'add'}});
}
onEdit = (circle: Circle) => {
  this.circlesvr.currentCircle = circle;
  this.router.navigate(['/frame/schoolteacherworkplatform/classescircledetail'], {queryParams: {nowEdit : 'edit'}});
}

onDelete = (circle: Circle) => {
  this.modalService.confirm({
    nzTitle: '<i>提示</i>',
    nzContent: '<b>确定删除该数据吗?</b>',
    nzOnOk: () => {
      this.circlesvr.deleteCircle(circle).subscribe(re => {
         this.onQuery();
      });
    }
  });
}
  onCloseCircle = (circle: Circle) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定关闭圈子吗?</b>',
      nzOnOk: () => {
        this.circlesvr.closeCircle(this.user.teacher.teacherName, '').subscribe(
          re => {
            if (re) {
              this.message.create('success', '圈子已关闭!');
              this.onQuery();
            } else {
              this.message.create('error', `圈子未正常关闭!${re}`);
            }
          }
        );
      }
    });
  }
}
