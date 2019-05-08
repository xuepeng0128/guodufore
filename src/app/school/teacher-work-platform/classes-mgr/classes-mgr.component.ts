import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {Classes} from '../../../entity/Classes';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {CommonService} from '../../../shared/common.service';
import {from, of} from 'rxjs';
import {distinct, distinctUntilChanged, map, mergeScan, scan} from 'rxjs/operators';
import {IClassStudentQueryResult} from '../../../shared/interface/queryparams/IClassStudentQueryResult';
import {Teacher} from '../../../entity/Teacher';

@Component({
  selector: 'app-classes-mgr',
  templateUrl: './classes-mgr.component.html',
  styleUrls: ['./classes-mgr.component.css']
})
export class ClassesMgrComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  allGrades = [];
  choosedGrade = 1;
  teacherClasses: Array<Classes> = new Array<Classes>();
  classesStudentArray: Array<IClassStudentQueryResult> = new Array<IClassStudentQueryResult>();
  constructor(private usersvr: UserService, private classessvr: ClassesService,
              public commonsvr: CommonService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    if (this.loginUser.teacher.master) {
       this.allGrades = [1, 2, 3, 4, 5, 6];
    } else {
      this.classessvr.teacherAtClasses(this.loginUser.teacher.teacherId).subscribe(
        re => {
          this.teacherClasses = re;
          from(this.teacherClasses).pipe(
              map( re => re.grade),
              distinctUntilChanged(),
              mergeScan((acc, one) => of([...acc, one]), new Array<number>() )
          ).subscribe(
             res => this.allGrades = res
          );
        }
      );
    }

  }
  onAdd = () => {

  }

  handleExcelChange = (file: UploadFile) => {
    if (file.file.response !== null) {
      // this.isTeacherExcelImpModalShow = true;
      // this.prepareImportTeachers = new Array<Teacher>();
      // (file.file.response as Array<Teacher>).forEach( v =>
      //   this.prepareImportTeachers.push( new Teacher({teacherId: '', teacherPaperId : v.teacherPaperId, schoolId : this.loginUser.school.schoolId
      //     , tel : v.tel, teacherName : v.teacherName , teacherDutyId : '02' , address : v.address  }))
      // );
      // file.file.response = null;
    }

  }




}
