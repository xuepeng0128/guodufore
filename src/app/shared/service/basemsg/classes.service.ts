import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Classes} from '../../../entity/Classes';
import {IClassQueryParams} from '../../interface/queryparams/IClassQueryParams';
import {IClassesQueryResult} from '../../interface/queryparams/IClassQueryResult';
import {map} from 'rxjs/operators';
import {IClassStudentQueryResult} from '../../interface/queryparams/IClassStudentQueryResult';
import {ClassesTeacher} from '../../../entity/ClassesTeacher';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpsvr: HttpService) { }

  classesList = (queryparams: IClassQueryParams): Observable<Array<IClassesQueryResult>> => {
     return this.httpsvr.onHttpGet('api/basemsg/classes/classesList', queryparams);
  }

  classListTotal = (queryparams: IClassQueryParams): Observable<number> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/classesListTotal', queryparams).pipe(
       map(re => parseInt(re.total , 10))
    );
  }


  insertClasses = (classes: Classes): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/insertClasses', classes).pipe(
      map( re => re.result)
    );
  }

  updateClasses = (classes: Classes): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/updateClasses', classes).pipe(
      map( re => re.result)
    );
  }

  deleteClasses = (classes: Classes): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/updateClasses', classes).pipe(
      map( re => re.result)
    );
  }

  teacherTeachedClasses = (teacherId: string): Observable<Array<Classes>> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/teacherTeachedClasses', {teacherId});
  }

  subjectTeachersAtClasses = (classesId: string, schoolId: string): Observable<Array<ClassesTeacher>> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/subjectTeachersAtClasses', {classesId, schoolId});
  }
  saveTeacherAtClasses = (classesTeacher: ClassesTeacher): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/saveClassesTeacher', classesTeacher).pipe(
        map( re => re.result)
    );
  }




  studentAtClasses = (classesId: string, schoolId: string): Observable<Array<IClassStudentQueryResult>> => {
     return this.httpsvr.onHttpGet('api/basemsg/classes/studentAtClasses', {classesId, schoolId});
  }
}
