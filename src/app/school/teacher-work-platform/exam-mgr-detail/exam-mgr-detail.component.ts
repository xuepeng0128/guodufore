import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoginUser} from "../../../entity/LoginUser";
import {UPLOAD_MEDIA_PATH} from "../../../shared/const";
import {Classes} from "../../../entity/Classes";
import {CircleService} from "../../../shared/service/business/circle.service";
import {NzMessageService} from "ng-zorro-antd";
import {UserService} from "../../../shared/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassesService} from "../../../shared/service/basemsg/classes.service";
import {iif} from "rxjs";
import {isNullOrUndefined} from "util";
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from "../../../shared/SysMessage";
import {ExamService} from "../../../shared/service/business/exam.service";
import {SubExam} from "../../../entity/SubExam";
import {CommonService} from "../../../shared/common.service";

@Component({
  selector: 'app-exam-mgr-detail',
  templateUrl: './exam-mgr-detail.component.html',
  styleUrls: ['./exam-mgr-detail.component.css']
})
export class ExamMgrDetailComponent implements OnInit {

  loginUser: LoginUser = this.usersvr.getUserStorage();
  nowState = 'browse';
  rowSpan = 1;
  setScoreSubject : Array<{subjectExamClassNameId : string , subjectExamClassNameName : string ,defficulty : number,score : number,subjects : number}> =
       new Array<{subjectExamClassNameId: string, subjectExamClassNameName: string, defficulty: number,score : number,subjects : number}>();
  constructor(public examsvr: ExamService, private message: NzMessageService,
                private usersvr: UserService,private classessvr : ClassesService,
               private route: ActivatedRoute, private router: Router,public commonsvr : CommonService) {
  }

  ngOnInit() {
    this.nowState = this.route.snapshot.queryParams.nowEdit as string;
    if (this.nowState==='add'){
          this.examsvr.currentExam.schoolId=this.loginUser.school.schoolId;
          this.examsvr.currentExam.classesId=this.examsvr.teacherTeachedClasses.length===0 ?  '' :
                                               this.examsvr.teacherTeachedClasses[0].classesId ;
          this.examsvr.currentExam.studySubjectId=this.examsvr.studySubjects.length>0 ? this.examsvr.studySubjects[0].studySubjectId : '';
          this.examsvr.currentExam.subExams= new Array<SubExam>();
          this.examsvr.initSubExamList(this.loginUser.school.schoolId,this.examsvr.currentExam.classesId,
                                         this.examsvr.currentExam.studySubjectId)
            .subscribe(
               re => {
                 this.examsvr.currentExam.subExams=re ;
                 this.rowSpan=this.calRowspan();
                 this.setScoreSubject=this.setScoreArray();
               }
            );
    }else {
         this.examsvr.subExamList(this.examsvr.currentExam.examId).subscribe(
             re =>{
               this.examsvr.currentExam.subExams=re;
               this.rowSpan=this.calRowspan();
               this.setScoreSubject=this.setScoreArray();
             }
         );
    }
  }

  onSave = () => {
    if (this.nowState === 'add') {
      const exid = this.examsvr.makeExamId();
      this.examsvr.currentExam.examId = exid;
      this.examsvr.currentExam.subExams.forEach(v => v.examId= exid);
    }
    this.examsvr.saveExam(this.examsvr.currentExam).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onBack();
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
  onClassesChange=()=>{
    if( this.examsvr.currentExam.studySubjectId==='0')
      this.examsvr.currentExam.subExams= new Array<SubExam>();
    else{
      this.examsvr.initSubExamList(this.loginUser.school.schoolId,this.examsvr.currentExam.classesId,this.examsvr.currentExam.studySubjectId)
        .subscribe(
          re =>  {
            this.examsvr.currentExam.subExams=re;
            this.rowSpan=this.calRowspan();
          }
        );
    }
  }
  studySubjectChange=()=>{
    if( this.examsvr.currentExam.studySubjectId==='0')
         this.examsvr.currentExam.subExams= new Array<SubExam>();
    else{
      this.examsvr.initSubExamList(this.loginUser.school.schoolId,this.examsvr.currentExam.classesId,this.examsvr.currentExam.studySubjectId)
        .subscribe(
          re =>  {
            this.examsvr.currentExam.subExams=re;
            this.rowSpan=this.calRowspan();
          }
        );
    }
  }
  onBack = () => {
    window.history.back();
  }


  calRowspan=() :number=>{
      let temp =0;
      let sid=this.examsvr.currentExam.subExams[0].studentId;
      this.examsvr.currentExam.subExams.forEach( v =>{
          if (v.studentId=== sid){
                 temp ++;
          }else {

                 return temp;
          }
      });
      return temp;
  }

  setScoreArray =() :  Array<{subjectExamClassNameId : string , subjectExamClassNameName : string ,defficulty : number,score : number,subjects : number}> =>{
    let temp : Array<{subjectExamClassNameId : string , subjectExamClassNameName : string ,defficulty : number,score : number,subjects:number}> =
      new Array<{subjectExamClassNameId: string, subjectExamClassNameName: string, defficulty: number,score : number,subjects:number}>();
    let sid=this.examsvr.currentExam.subExams[0].studentId;
    this.examsvr.currentExam.subExams.forEach( v =>{
      if (v.studentId=== sid){
        temp.push({subjectExamClassNameId:v.subjectExamClassId,subjectExamClassNameName : v.subjectExamClassName,defficulty : v.defficulty,score:0,subjects:0});
      }else {

        return temp;
      }
    });
    return temp;

  }
}
