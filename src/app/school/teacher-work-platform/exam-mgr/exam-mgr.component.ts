import { Component, OnInit} from '@angular/core';
import {LoginUser} from "../../../entity/LoginUser";
import {UserService} from "../../../shared/user.service";
import {CircleService} from "../../../shared/service/business/circle.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonService} from "../../../shared/common.service";
import {ClassesService} from "../../../shared/service/basemsg/classes.service";
import {Router} from "@angular/router";
import {ExamService} from "../../../shared/service/business/exam.service";
import {iif, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {Circle} from "../../../entity/Circle";
import {Exam} from "../../../entity/Exam";
import {StudySubjectService} from "../../../shared/service/dic/study-subject.service";


@Component({
  selector: 'app-exam-mgr',
  templateUrl: './exam-mgr.component.html',
  styleUrls: ['./exam-mgr.component.css']
})
export class ExamMgrComponent implements OnInit {
  loginUser: LoginUser = this.usersvr.getUserStorage();
  examArray : Array<Exam> = new Array<Exam>();
  total = 0;
  constructor(private usersvr: UserService, private modalService: NzModalService,
              private message: NzMessageService, public commonsvr: CommonService,
              private classessvr: ClassesService , private  router: Router,
              public examsvr : ExamService, private studysubjectsvr : StudySubjectService) {


  }

  ngOnInit() {
    iif(
      () => this.loginUser.teacher.master,
                   of(''),
                   this.classessvr.teacherTeachedClasses(this.loginUser.teacher.teacherId,this.loginUser.school.schoolId,this.loginUser.school.schoolStyle).pipe(
                     map(re => {
                       this.examsvr.teacherTeachedClasses=re;
                       return  re.map(v => v.classesId).join(',');
                     })
                   )
    ).pipe(
      flatMap( re => {
        this.examsvr.queryParams.classesIds=re;
        this.examsvr.queryParams.schoolId=this.loginUser.school.schoolId;
        return this.examsvr.examList(this.examsvr.queryParams)
      })
    ).subscribe( re => {
        this.examArray =re;
        this.examsvr.examListTotal(this.examsvr.queryParams).subscribe(
             re => this.total=re
        );
    });

    this.studysubjectsvr.studySubjectList().subscribe(
       re =>   this.examsvr.studySubjects=re
    );
  }
 onQuery=()=>{
   this.examsvr.queryParams.pageNo=1;
   this.examsvr.queryParams.pageSize=10;
   this.examsvr.queryParams.pageBegin=(this.examsvr.queryParams.pageNo - 1) * this.examsvr.queryParams.pageSize;
   this.examsvr.examList(this.examsvr.queryParams).subscribe( re => {
     this.examArray = re;
   });

   this.examsvr.examListTotal(this.examsvr.queryParams).subscribe(
     re => this.total=re
   );
 }

  onPageChange = () => {
    this.examsvr.queryParams.pageBegin = (this.examsvr.queryParams.pageNo - 1) * this.examsvr.queryParams.pageSize;
    this.examsvr.examList(this.examsvr.queryParams).subscribe(
      re => this.examArray = re
    );
  }
  onAdd = () => {

    this.examsvr.currentExam = new Exam({
      schoolId: this.loginUser.school.schoolId
    });
    this.router.navigate(['/frame/schoolteacherworkplatform/exammgrdetail'], {queryParams: {nowEdit : 'add'}});
  }
  onEdit = (exam: Exam) => {
    this.examsvr.currentExam = exam;
    this.router.navigate(['/frame/schoolteacherworkplatform/exammgrdetail'], {queryParams: {nowEdit : 'edit'}});
  }

  onDelete = (exam: Exam) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.examsvr.deleteExam(exam.examId).subscribe(re => {
          this.onQuery();
        });
      }
    });
  }





}
