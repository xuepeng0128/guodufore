import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {TeacherLesson} from '../../../entity/TeacherLesson';
import {map} from 'rxjs/operators';
import {SubTeacherLesson} from '../../../entity/SubTeacherLesson';
import {ITeacherLessonQueryParams} from '../../interface/queryparams/ITeacherLessonQueryParams';

@Injectable({
  providedIn: 'root'
})
export class TeacherLessonService {
  queryParams: ITeacherLessonQueryParams = {
    lessonTitle : '',
    teacherId : '',
    teacherName : '',
    schoolId : '',
    schoolName : '',
    pageNo : 1,
    pageSize : 10 ,
    pageBegin : 0
  };
  currentLesson: TeacherLesson = new TeacherLesson({});
  currentSubLessonArray: Array<SubTeacherLesson> = new Array<SubTeacherLesson>();
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
publishToHabit = (lessonId: string , habitId: string ): Observable<string> => {
  return this.httpsvr.onHttpGet('api/business/teacherLesson/publishToHabit', {habitId, lessonId}).pipe(
    map( re => re.result)
  );
}
  deleteTeacherLesson = (lessonId: string): Observable<string> => {
       return null;
  }


  makeLessonId = (): string => {
    const t = new Date().getTime();
    return 'LES' + t;
  }

}
