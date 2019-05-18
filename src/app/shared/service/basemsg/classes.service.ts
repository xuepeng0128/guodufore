import { Injectable } from '@angular/core';
import {HttpService} from '../baseapi/http.service';
import {Observable} from 'rxjs';
import {Classes} from '../../../entity/Classes';
import {IClassQueryParams} from '../../interface/queryparams/IClassQueryParams';
import {IClassesQueryResult} from '../../interface/queryparams/IClassQueryResult';
import {flatMap, map} from 'rxjs/operators';
import {IClassStudentQueryResult} from '../../interface/queryparams/IClassStudentQueryResult';
import {ClassesTeacher} from '../../../entity/ClassesTeacher';
import {Student} from '../../../entity/Student';
import {ClassesStudent} from '../../../entity/ClassesStudent';

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
  gradeClasses = (grade: string , schoolId: string ): Observable<Array<Classes>> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/gradeClasses', {grade, schoolId});
  }
  teacherTeachedClasses = (teacherId: string, schoolId: string, schoolStyle: number ): Observable<Array<Classes>> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/teacherTeachedClasses', {teacherId, schoolId, schoolStyle});
  }

  subjectTeachersAtClasses = (classesId: string, schoolId: string , schoolStyle: number ): Observable<Array<ClassesTeacher>> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/subjectTeachersAtClasses', {classesId, schoolId , schoolStyle});
  }
  saveTeacherAtClasses = (classesTeacher: ClassesTeacher): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/saveClassesTeacher', classesTeacher).pipe(
        map( re => re.result)
    );
  }

  studentAtClasses = (classesId: string, schoolId: string): Observable<Array<IClassStudentQueryResult>> => {
     return this.httpsvr.onHttpGet('api/basemsg/classes/studentAtClasses', {classesId, schoolId});
  }


  groupAddStudents = (cstudent: {classesId: string , studentList: Array<Student>}): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/groupInsertClassesStudent', cstudent).pipe(
       map(re => re.result)
    );
  }

  insertClassesStudent = (classesStudent: ClassesStudent): Observable<string> => {
   return this.httpsvr.onHttpPost('api/basemsg/classes/insertClassesStudent', classesStudent).pipe(
      map(re => re.result)
   );
  }

  updateClassesStudent = (classesStudent: ClassesStudent): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/updateClassesStudent', classesStudent).pipe(
      map(re => re.result)
    );
  }
  classesStudentLeave = (classesStudent: ClassesStudent): Observable<string> => {
    return this.httpsvr.onHttpPost('api/basemsg/classes/classesStudentLeave', classesStudent).pipe(
      map(re => re.result)
    );
  }
  deleteClassesStudent = (classesId: string, studentId: string): Observable<string> => {
    return this.httpsvr.onHttpGet('api/basemsg/classes/deleteClassesStudent', {classesId, studentId}).pipe(
      map(re => re.result)
    );
  }
}
