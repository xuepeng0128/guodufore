import { Injectable } from '@angular/core';
import {IExamQueryParams} from "../../interface/queryparams/IExamQueryParams";
import {Exam} from "../../../entity/Exam";
import {HttpService} from "../baseapi/http.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SubExam} from "../../../entity/SubExam";
import {Classes} from "../../../entity/Classes";
import {StudySubject} from "../../../entity/StudySubject";

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  queryParams : IExamQueryParams ={
    classesIds :'',
    schoolId:'',
     pageBegin:0,
     pageSize :10,
     pageNo :1
  }
  currentExam :Exam =new Exam();
  teacherTeachedClasses : Array<Classes> = new Array<Classes>();
  studySubjects : Array<StudySubject> = new Array<StudySubject>();
  constructor(private httpsvr: HttpService) { }

  examList=(queryparams : IExamQueryParams) :Observable<Array<Exam>> =>{
    return this.httpsvr.onHttpGet('api/business/exam/examList',queryparams);
  }
  examListTotal =(queryparams : IExamQueryParams) :Observable<number> =>{
    return this.httpsvr.onHttpGet('api/business/exam/examListTotal',queryparams).pipe(
      map(re => re.total)
    )
  }
saveExam =(exam : Exam) : Observable<string> =>{
    return this.httpsvr.onHttpPost('api/business/exam/saveExam',exam).pipe(
      map( re => re.result)
    );;
}

deleteExam =(examId : string) : Observable<string> =>{
    return this.httpsvr.onHttpGet('api/business/exam/deleteExam',{examId}).pipe(
      map( re => re.result)
    );;
}

  subExamList =(examId : string ) : Observable<Array<SubExam>> =>{
    return this.httpsvr.onHttpGet('api/business/exam/subExamList',{examId}).pipe(
         map( re =>{
                  let tmpList : Array<SubExam> = new Array<SubExam>();
                  let tmpstudentId : string ='';
                  let tmpsubjectExamClassId : string ='';

                  (re as Array<SubExam>).forEach( v =>{
                       if (v.studentId !== tmpstudentId){
                           v.studentIdShow=true;
                           v.studentNameShow=true;
                           tmpstudentId=v.studentId;
                       }else {
                           v.studentIdShow=false;
                           v.studentNameShow=false;
                       }
                       if (v.subjectExamClassId !== tmpsubjectExamClassId){
                          v.subjectExamClassNameshow=true;
                          tmpsubjectExamClassId=v.subjectExamClassId;
                       }else {
                          v.subjectExamClassNameshow=false;
                       }
                       tmpList.push(v);
                  });
                  return tmpList;
         })
    );
  }

  initSubExamList=(schoolId : string,classesId: string ,studySubjectId: string) : Observable<Array<SubExam>> =>{
    return this.httpsvr.onHttpGet('api/business/exam/initSubExamList',{schoolId,classesId,studySubjectId}).pipe(
      map( re =>{
        let tmpList : Array<SubExam> = new Array<SubExam>();
        let tmpstudentId : string ='';
        let tmpsubjectExamClassId : string ='';

        (re as Array<SubExam>).forEach( v =>{
          if (v.studentId !== tmpstudentId){
            v.studentIdShow=true;
            v.studentNameShow=true;
            tmpstudentId=v.studentId;
          }else {
             v.studentIdShow=false;
             v.studentNameShow=false;
          }
          if (v.subjectExamClassId !== tmpsubjectExamClassId){
            v.subjectExamClassNameshow=true;
            tmpsubjectExamClassId=v.subjectExamClassId;
          }else {
            v.subjectExamClassNameshow=false;
          }
          tmpList.push(v);
        });
        return tmpList;
      })

    );
  }
  makeExamId = (): string => {
    const t = new Date().getTime();
    return 'EXAM' + t;
  }

}
