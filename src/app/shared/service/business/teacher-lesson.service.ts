import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {TeacherLesson} from '../../../entity/TeacherLesson';
import {map} from 'rxjs/operators';
import {SubTeacherLesson} from '../../../entity/SubTeacherLesson';

@Injectable({
  providedIn: 'root'
})
export class TeacherLessonService {

  constructor(private httpsvr: HttpService) { }

  teacherLessonList = (queryParams: any): Observable<Array<TeacherLesson>> => {
    return this.httpsvr.onHttpGet('api/business/teacherLesson/teacherLessonList', queryParams);
  }
  teacherLessonListTotal = (queryParams: any): Observable<number> => {
    return this.httpsvr.onHttpGet('api/business/teacherLesson/teacherLessonListTotal', queryParams).pipe(
        map( re => re.total)
    );
  }

  subTeacherLessonList = (lessonId: string): Observable<Array<SubTeacherLesson>> => {
    return this.httpsvr.onHttpGet('api/business/teacherLesson/subTeacherLessonList', {lessonId});
  }
  saveTeacherLesson = (lesson: {teacherLesson: TeacherLesson, subTeacherLessons: Array<SubTeacherLesson>}): Observable<string> => {
    return this.httpsvr.onHttpPost('api/business/teacherLesson/saveTeacherLesson', lesson).pipe(
        map( re => re.result)
    );
  }



publishTeacherLesson = (paras: {lessonId: string , teacherHabitIds: Array<string>}) => {

}

  deleteTeacherLesson = (lessonId: string): Observable<string> => {
       return null;
  }


  makeLessonId = (): string => {
    const t = new Date().getTime();
    return 'LES' + t;
  }

}
