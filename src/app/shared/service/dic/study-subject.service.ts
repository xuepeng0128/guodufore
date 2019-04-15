import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {StudySubject} from '../../../entity/StudySubject';
import {HttpService} from '../baseapi/http.service';
import {CorpDuty} from '../../../entity/CorpDuty';

@Injectable({
  providedIn: 'root'
})
export class StudySubjectService {

  constructor(private  httpsvr: HttpService) { }

  studySubjectList = (): Observable<Array<StudySubject>> => {
      return this.httpsvr.onHttpGet('/api/dic/studysubject/studySubjectList', {});
  }
  insertStudySubject = (studySubject: StudySubject): Observable<StudySubject> => {
    return this.httpsvr.onHttpPost('/api/dic/studysubject/insertStudySubject', studySubject);
  }
  updateStudySubject = (studySubject: StudySubject): Observable<StudySubject> => {
    return this.httpsvr.onHttpPost('/api/dic/studysubject/updateStudySubject', studySubject);
  }

  deleteStudySubject = (studySubject: StudySubject): Observable<string> => {
    return this.httpsvr.onHttpPost('/api/dic/studysubject/deleteStudySubject', studySubject);
  }

}
