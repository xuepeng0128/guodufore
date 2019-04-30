import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {StudySubject} from '../../../entity/StudySubject';
import {SubjectExamClass} from '../../../entity/SubjectExamClass';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectExamClassService {

  constructor(private httpsvr: HttpService) { }

  subjectExamClassList = (): Observable<Array<SubjectExamClass>> => {
    return this.httpsvr.onHttpGet('api/dic/subjectexamclass/subjectExamClassList', {});
  }
  findById = (subjectExamClassId: string): Observable<SubjectExamClass> => {
       return this.httpsvr.onHttpGet('api/dic/subjectexamclass/findById', {subjectExamClassId});
  }
  insertSubjectExamClass = (subjectExamClass: SubjectExamClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/subjectexamclass/insertSubjectExamClass', subjectExamClass).pipe(
      map( re => re.result)
    );
  }
  updateSubjectExamClass = (subjectExamClass: SubjectExamClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/subjectexamclass/updateSubjectExamClass', subjectExamClass).pipe(
      map( re => re.result)
    );
  }

  deleteSubjectExamClass = (subjectExamClass: SubjectExamClass): Observable<string> => {
    return this.httpsvr.onHttpPost('api/dic/subjectexamclass/deleteSubjectExamClass', subjectExamClass).pipe(
      map( re => re.result)
    );
  }





}
