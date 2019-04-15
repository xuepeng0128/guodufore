import { Component, OnInit } from '@angular/core';
import {Circle} from '../../../entity/Circle';
import {UserService} from '../../../shared/user.service';
import {StudySubjectService} from '../../../shared/service/dic/study-subject.service';
import {StudySubject} from '../../../entity/StudySubject';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {User} from '../../../entity/User';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {map, switchMap} from 'rxjs/operators';
import {iif} from 'rxjs/index';
import {CircleService} from '../../../shared/service/business/circle.service';

@Component({
  selector: 'app-school-circle',
  templateUrl: './school-circle.component.html',
  styleUrls: ['./school-circle.component.css']
})
export class SchoolCircleComponent implements OnInit {

  user: User = this.usersvr.getUserStorage();
  isSchoolCircleModalShow = false;
  schoolCircleArray: Array<Circle> = new Array<Circle>();
  currentSchoolCircle: Circle = new Circle();
  editState = 'browse';
  total = 0;
  queryParams = {
    circleName : '',
    schoolId : this.user.manageSchool.schoolId,
    teacherPaperId : this.user.teacher.teacherDuty.master ? '' : this.user.teacher.paperId,
    teacharName : '',
    studentName : '',
    buildDateBegin : new Date() ,
    buildDateEnd : new Date(),
    pageSize : 20,
    pageNo : 1,
    getTotal : '1'
  };
  constructor(private usersvr: UserService, private circlesvr: CircleService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.getTotal = '1';
    this.circlesvr.schoolCircleList(this.queryParams).subscribe(re => {
      this.schoolCircleArray = re.list;
      this.total = re.total;
    });
  }
  onPageChange = (e) => {
    this.queryParams.pageNo = e;
    this.queryParams.getTotal = '0';
    this.circlesvr.schoolCircleList(this.queryParams).subscribe(re => {
      this.schoolCircleArray = re.list;
    });
  }


  onAdd = () => {
    this.editState = 'add';
    this.currentSchoolCircle = new Circle();
    this.isSchoolCircleModalShow = true;
  }
  onEdit = (circle: Circle) => {
    this.currentSchoolCircle = circle;
    this.editState = 'edit';
    this.isSchoolCircleModalShow = true;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
      this.circlesvr.insertCircle(this.currentSchoolCircle),
      this.circlesvr.updateCircle(this.currentSchoolCircle)
    ).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isSchoolCircleModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }

      }

    );
  }
  onDelete = (circle: Circle) => {

    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.circlesvr.deleteCircle(circle).subscribe( re => {
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
