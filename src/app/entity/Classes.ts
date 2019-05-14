import {School} from './School';
import {Student} from './Student';
import {Teacher} from './Teacher';
import {ClassesTeacher} from './ClassesTeacher';
import {ClassesStudent} from './ClassesStudent';

export class Classes {
  classesId: string;
  grade: number;  // 年纪 学籍 2013 级
  classes: number; // 班级
  classesName: string;
  headMaster: string ; // 班主任
  headMasterName: string;
  schoolId: string; // 所属学校
  schoolName: string;
  regTime: Date;
  endTime: Date;
  students: Array<ClassesStudent>; // 班级学生
  teachers: Array<ClassesTeacher>;

  constructor(options: { classesId ?: string, grade?: number, classes?: number, classesName?: string,
                          headMaster?: string, headMasterName ?: string, schoolId?: string, schoolName?: string,
                          regTime?: Date, endTime?: Date,
                          students?: Array<ClassesStudent>, teachers?: Array<ClassesTeacher>}= {}) {
    this.classesId = options.classesId;
    this.grade = options.grade || (new Date()).getFullYear();
    this.classes = options.classes || 1;
    this.classesName = options.classesName || '';
    this.headMaster = options.headMaster || '';
    this.headMasterName = options.headMasterName || '';
    this.schoolId = options.schoolId || '';
    this.schoolName = options.schoolName || '';
    this.regTime = options.regTime || new Date();
    this.endTime = options.endTime;
    this.students = options.students || new Array<ClassesStudent>();
    this.teachers = options.teachers || new Array<ClassesTeacher>();
  }
}
