import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {Classes} from '../../../entity/Classes';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {CommonService} from '../../../shared/common.service';
import {from, of} from 'rxjs';
import {distinct, distinctUntilChanged, map, mergeScan, scan, takeLast} from 'rxjs/operators';
import {IClassStudentQueryResult} from '../../../shared/interface/queryparams/IClassStudentQueryResult';
import {Teacher} from '../../../entity/Teacher';
import {ClassesTeacher} from '../../../entity/ClassesTeacher';
import {ClassesStudent} from '../../../entity/ClassesStudent';
import {DOWNLOAD_TEMPLATE_PATH, UPLOAD_TEACHER_TEMPLATE_PATH} from '../../../shared/const';

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
       headMaster : '',
       headMasterName : '',
       subjectTeachersAtClasses : new  Array<ClassesTeacher>(),
       studentAtClasses : new Array<IClassStudentQueryResult>()
  };
  teacherClasses: Array<Classes> = new Array<Classes>();




  nowState = 'browse';

  isStudentExcelImpModalShow = false;
  downloadTemplateExcel = DOWNLOAD_TEMPLATE_PATH + 'studentTemplate.xls';
  uploadExcelpath = UPLOAD_TEACHER_TEMPLATE_PATH;
  constructor(private usersvr: UserService, private classessvr: ClassesService,
              public commonsvr: CommonService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    if (this.loginUser.teacher.master) {
       this.allGrades = [1, 2, 3, 4, 5, 6];
    } else {
      this.classessvr.teacherTeachedClasses(this.loginUser.teacher.teacherId, this.loginUser.school.schoolId, this.loginUser.school.schoolStyle).subscribe(
        re => {
          this.teacherClasses = re;
          from(this.teacherClasses).pipe(
              map( (rec: Classes) => this.loginUser.school.schoolStyle === 1 ? parseInt( this.commonsvr.calculateSchoolYearPrimarySchool(rec.grade), 10) :
                                               parseInt(this.commonsvr.calculateSchoolYearMiddleSchool(rec.grade), 10)
              ),
              distinctUntilChanged(),
              mergeScan(( acc: Array<number>, one: number) => of([...acc, one]), new Array<number>() ),
            takeLast(1)
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
  onChooseGrade = () => {
      const tempClassId: string =  this.teacherClasses.filter(o => o.grade === this.choosedGrade)[0].classesId;
      this.onChooseClasses(tempClassId);
  }

  // 选择班级
 onChooseClasses = (classesId: string) => {
   const tempClass: Classes =  this.teacherClasses.filter(o => o.classesId === classesId)[0];
   this.currentChoosedClasses.classesId = tempClass.classesId;
   this.currentChoosedClasses.classes = tempClass.classes;
   this.classessvr.subjectTeachersAtClasses(tempClass.classesId, this.loginUser.school.schoolId, this.loginUser.school.schoolStyle).subscribe(
     re =>  this.currentChoosedClasses.subjectTeachersAtClasses = re
   );
   this.classessvr.studentAtClasses(tempClass.classesId, this.loginUser.school.schoolId).subscribe(
     re => this.currentChoosedClasses.studentAtClasses = re
   );
 }






  onToImportStudent=()=>{

  }
  onAdd = () => {

  }

  onEdit = () => {

  }
  onTranSchool = () => {

  }
  onDelete = () => {

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
