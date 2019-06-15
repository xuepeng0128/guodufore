import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {Classes} from '../../../entity/Classes';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {CommonService} from '../../../shared/common.service';
import {from, iif, of, Subject} from 'rxjs';
import {distinct, distinctUntilChanged, map, mergeScan, scan, takeLast} from 'rxjs/operators';
import {ClassesStudent} from '../../../entity/ClassesStudent';
import {DOWNLOAD_TEMPLATE_PATH, UPLOAD_STUDENT_TEMPLATE_PATH} from '../../../shared/const';
import {Student} from '../../../entity/Student';
import {ClassesTeacher} from '../../../entity/ClassesTeacher';
import {Teacher} from '../../../entity/Teacher';
import {ExceloutService} from '../../../shared/excelout.service';

@Component({
  selector: 'app-classes-mgr',
  templateUrl: './classes-mgr.component.html',
  styleUrls: ['./classes-mgr.component.css']
})
export class ClassesMgrComponent implements OnInit {
  teacherChooseSign$: Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}> =
     new Subject<{singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>();
  choosedStudySubjectId = '';

  classStudentWinOrder$: Subject<{nowState: string , classesStudent: ClassesStudent, classesId: string}> =
    new Subject<{nowState: string, classesStudent: ClassesStudent, classesId: string}>();

  loginUser: LoginUser = this.usersvr.getUserStorage();
  allGrades = [];
  choosedGrade = 1;

  gradeChoosedClasses: Array<Classes> = new Array<Classes>();
  currentChoosedClasses: Classes = new Classes({});
  teacherClasses: Array<Classes> = new Array<Classes>();

  nowState = 'browse';

  isStudentExcelImpModalShow = false;
  downloadTemplateExcel = DOWNLOAD_TEMPLATE_PATH + 'studentTemplate.xls';
  uploadExcelpath = UPLOAD_STUDENT_TEMPLATE_PATH;
  prepareImportStudents: Array<Student> = new Array<Student>();
  constructor(private usersvr: UserService, private classessvr: ClassesService,
              public commonsvr: CommonService, private  exceloutsvr: ExceloutService,
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
               if (this.allGrades.length > 0) {
                   this.choosedGrade = this.allGrades[0];
                   this.onChooseGrade();
               }
             }
          );
        }
      );
    }
  }
  // 选择年级
  onChooseGrade = () => {
      const tempClassId = '';
      iif(
        () =>  this.loginUser.teacher.master,
                          of(null), //  this.classessvr.gradeClasses(this.commonsvr.calculateGradeSchool(this.choosedGrade).toString(), this.loginUser.school.schoolId),
                          of(this.teacherClasses.filter(o => o.grade === this.commonsvr.calculateGradeSchool(this.choosedGrade)))
      ).subscribe(
        re => {
          this.gradeChoosedClasses = re;
          if (this.gradeChoosedClasses.length > 0) {
             this.currentChoosedClasses = this.gradeChoosedClasses[0];
          }
        }
      );
  }
  onSelectClasses = (classesId: string) => {
       this.currentChoosedClasses = this.gradeChoosedClasses.filter(o => o.classesId === classesId)[0];
  }
  onToImportStudent = () => {
    this.classessvr.groupAddStudents({ classesId: this.currentChoosedClasses.classesId, studentList: this.prepareImportStudents}).subscribe(
      re => {
        this.prepareImportStudents.forEach(v => {
          this.gradeChoosedClasses.filter(s => s.classesId === this.currentChoosedClasses.classesId)[0].students
          .push(new ClassesStudent({classesId: this.currentChoosedClasses.classesId,
                                                 studentId : v.studentId,  studentPaperId : v.studentPaperId,
                                                 sex : v.sex, birthday : v.birthday, schoolId : v.schoolId, address : v.address ,
                                                 tel : v.tel }));
        });
        this.isStudentExcelImpModalShow = false;
      }
    );
  }




  toChooseTeacher = (studySubjectId: string ) => {
    this.choosedStudySubjectId = studySubjectId;
    this.teacherChooseSign$.next({singleChoose: true, haveChoosedTeacher : null});
  }
  choosedStudySubjectTeacher = (teacher: Teacher) => {
        const cteacher: ClassesTeacher = new ClassesTeacher({ classesId: this.currentChoosedClasses.classesId,
          teacherId: teacher.teacherId, teacherName: teacher.teacherName,
          studySubjectId: this.choosedStudySubjectId, studySubjectName: '',
          schoolStyle: this.loginUser.school.schoolStyle
        });
        this.classessvr.saveTeacherAtClasses(cteacher).subscribe(
               re => {
                    const tc = this.currentChoosedClasses.teachers.
                    filter(x => x.studySubjectId === cteacher.studySubjectId)[0];
                    tc.teacherId = cteacher.teacherId;
                    tc.teacherName = cteacher.teacherName;
               }


        );
  }

  onAdd = () => {
      this.classStudentWinOrder$.next({nowState: 'add', classesStudent: null, classesId: this.currentChoosedClasses.classesId});
  }

  onEdit = (classesStudent: ClassesStudent) => {
      this.classStudentWinOrder$.next({nowState: 'edit', classesStudent, classesId: this.currentChoosedClasses.classesId});
  }
  onSaveSingleStudent =(e : {nowState: string, classesStudent: ClassesStudent})=>{
    if (e.nowState==='add')
    {
      this.currentChoosedClasses.students.push(e.classesStudent);
    }else {
       this.currentChoosedClasses.students.filter(o=> o.studentId=== e.classesStudent.studentId)[0]= e.classesStudent;
    }
  this.onSelectClasses(this.currentChoosedClasses.classesId);
  }
  onTranSchool = (classesStudent: ClassesStudent) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定该学生转学离开本校吗?</b>',
      nzOnOk: () => {
        this.classessvr.classesStudentLeave(classesStudent).subscribe(
          re =>   this.currentChoosedClasses.students = this.currentChoosedClasses.students.filter(o => o.studentId !== classesStudent.studentId)
        );
      }
    });
  }
  onDelete = (classesStudent: ClassesStudent) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定该学生信息为录入错误吗（如已就读本校，删除将可能造成信息丢失）?</b>',
      nzOnOk: () => {
        this.classessvr.deleteClassesStudent(classesStudent.classesId, classesStudent.studentId).subscribe(
          re =>   this.currentChoosedClasses.students = this.currentChoosedClasses.students.filter(o => o.studentId !== classesStudent.studentId)
        );
      }
    });
  }


  handleExcelChange = (file: UploadFile) => {

    if (file.file.response !== null) {
      this.isStudentExcelImpModalShow = true;
      this.prepareImportStudents = new Array<Student>();
      (file.file.response as Array<Student>).forEach( v => {
         v.id = 0;
         v.headimg = null;
         v.nickname = null;
         v.wxcode = null;
         v.regTime = null;

         this.prepareImportStudents.push(  JSON.parse(JSON.stringify(v)) as Student );
      }

      );
      file.file.response = null;
    }

  }



  exportExcel = () => {
    const tHeader = [
      '学号',
      '身份证',
      '名称',
      '性别',
      '出生日期',
      '联系电话',
      '家庭住址',
      '邀请码'
    ];
    const body = [];
    this.currentChoosedClasses.students.forEach( v => {
      body.push({studentId : v.studentId.toString(), studentPaperId : v.studentPaperId.toString(), studentName : v.studentName, sex : v.sex === 1 ? '男' : '女' ,
        birthday :  (v.birthday + '').substring(0, 10) , tel: v.tel.toString() + ' ' ,
        address : v.address, inviteCode : v.inviteCode});
    });
    this.exceloutsvr.export2Excel(tHeader, body, '班级学生');
  }


}
