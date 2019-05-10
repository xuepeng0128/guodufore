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
import {ClassesTeacher} from '../../../entity/ClassesTeacher';
import {ClassesStudent} from '../../../entity/ClassesStudent';

@Component({
  selector: 'app-classes-mgr',
  templateUrl: './classes-mgr.component.html',
  styleUrls: ['./classes-mgr.component.css']
})
export class ClassesMgrComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  allGrades = [];
  choosedGrade = 1;

  currentChoosedClasses = {
       classesId : '',
       classes : 1,
       subjectTeachersAtClasses : new  Array<ClassesTeacher>(),
       studentAtClasses : new Array<IClassStudentQueryResult>()
  };


  teacherClasses: Array<Classes> = new Array<Classes>();
  classesStudentArray: Array<IClassStudentQueryResult> = new Array<IClassStudentQueryResult>();
  constructor(private usersvr: UserService, private classessvr: ClassesService,
              public commonsvr: CommonService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    if (this.loginUser.teacher.master) {
       this.allGrades = [1, 2, 3, 4, 5, 6];
    } else {
      this.classessvr.teacherTeachedClasses(this.loginUser.teacher.teacherId).subscribe(
        re => {
          this.teacherClasses = re;
          this.currentChoosedClasses.classesId = this.teacherClasses[0].classesId;
          this.currentChoosedClasses.classes = this.teacherClasses[0].classes;

          from(this.teacherClasses).pipe(
              map( (rec: Classes) => this.loginUser.school.schoolStyle === 1 ? this.commonsvr.calculateSchoolYearPrimarySchool(rec.grade) :
                                               this.commonsvr.calculateSchoolYearMiddleSchool(rec.grade)
              ),
              distinctUntilChanged(),
              mergeScan((acc, one) => of([...acc, one]), new Array<number>() )
          ).subscribe(
             res => {
               this.allGrades = res;
             }
          );
        }
      );
    }
  }
  // 选择年级
  choosedGrade = () => {
      const tempClassId: string =  this.teacherClasses.filter(o => o.grade === this.choosedGrade)[0].classesId;
      this.choosedClasses(tempClassId);
  }

  // 选择班级
 choosedClasses = (classesId: string) => {
   const tempClass: Classes =  this.teacherClasses.filter(o => o.classesId === classesId)[0];
   this.currentChoosedClasses.classesId = tempClass.classesId;
   this.currentChoosedClasses.classes = tempClass.classes;
   this.classessvr.subjectTeachersAtClasses(tempClass.classesId, this.loginUser.school.schoolId).subscribe(
     re =>  this.currentChoosedClasses.subjectTeachersAtClasses = re
   );
   this.classessvr.studentAtClasses(tempClass.classesId, this.loginUser.school.schoolId).subscribe(
     re => this.currentChoosedClasses.studentAtClasses = re
   );
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
