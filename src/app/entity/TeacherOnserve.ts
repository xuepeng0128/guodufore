import {School} from './School';
import {TeacherDuty} from './TeacherDuty';

export class TeacherOnserve {
  school: School; // 任教学校
  grade: number;  // 年纪
  classes: number; // 班级
  teacherDuty: TeacherDuty ; // 职务

  constructor(options: {school?: School, grade?: number, classes?: number, teacherDuty?: TeacherDuty}= {}) {
    this.school = options.school;
    this.grade = options.grade;
    this.classes = options.classes;
    this.teacherDuty = options.teacherDuty;
  }
}
