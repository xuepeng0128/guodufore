import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {StudySubject} from '../../../entity/StudySubject';
import {SubjectExamClass} from '../../../entity/SubjectExamClass';

@Injectable({
  providedIn: 'root'
})
export class SubjectExamClassService {

  constructor(private httpsvr: HttpService) { }

  subjectExamClassList = (): Observable<Array<SubjectExamClass>> => {
    return this.httpsvr.onHttpGet('/api/dic/subjectexamclass/subjectExamClassList', {});
  }
  findById = (subjectExamClassId: string): Observable<SubjectExamClass> => {
       return this.httpsvr.onHttpGet('/api/dic/subjectexamclass/findById', {subjectExamClassId});
  }
  insertSubjectExamClass = (subjectExamClass: SubjectExamClass): Observable<SubjectExamClass> => {
    return this.httpsvr.onHttpPost('/api/dic/subjectexamclass/insertSubjectExamClass', subjectExamClass);
  }
  updateSubjectExamClass = (subjectExamClass: SubjectExamClass): Observable<SubjectExamClass> => {
    return this.httpsvr.onHttpPost('/api/dic/subjectexamclass/updateSubjectExamClass', subjectExamClass);
  }

  deleteSubjectExamClass = (subjectExamClass: SubjectExamClass): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/subjectexamclass/deleteSubjectExamClass', subjectExamClass);
  }





}
