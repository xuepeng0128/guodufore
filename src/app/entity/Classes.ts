import {School} from './School';
import {Student} from './Student';
import {Teacher} from './Teacher';

export class Classes {
  id: string ;
  grade: number;  // 年纪
  classes: number; // 班级
  headmaster: Teacher; // 班主任
  assTeachers: Array<Teacher> ; // 代课老师
  school: School; // 所属学校
  students: Array<Student>; // 班级学生


  constructor(options: {id?: string, grade?: number, classes?: number, headmaster?: Teacher, assTeachers?: Array<Teacher>, school?: School, students?: Array<Student>}= {}) {
    this.id = options.id || '';
    this.grade = options.grade;
    this.classes = options.classes;
    this.headmaster = options.headmaster ;
    this.assTeachers = options.assTeachers;
    this.school = options.school || null;
    this.students = options.students;
  }
}
