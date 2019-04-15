import { School } from './School';
import { Teacher } from './Teacher';
import { Student } from './Student';
import {TrainSchool} from './TrainSchool';
import {Classes} from './Classes';

export class Circle {
    circleId: string ;
   circleName: string;
     school: School;
     trainSchool: TrainSchool;
      classes: Classes;
     buildMan: Teacher; // 创建人
     buildDate: Date; // 创建日期
     teachers: Array<Teacher> ; // 圈内老师
     students: Array<Student>; // 圈内学生
     endDate: Date; // 圈子关闭时间
     closeReason: string ; // 关闭原因
     closeMan: string;


  constructor(options: {circleId?: string, circleName?: string, school?: School, trainSchool?: TrainSchool,
                      classes?: Classes, buildMan?: Teacher, buildDate?: Date, teachers?: Array<Teacher>,
                      students?: Array<Student>, endDate?: Date, closeReason?: string, closeMan?: string}= {}) {
    this.circleId = options.circleId;
    this.circleName = options.circleName;
    this.school = options.school;
    this.trainSchool = options.trainSchool;
    this.classes = options.classes;
    this.buildMan = options.buildMan;
    this.buildDate = options.buildDate;
    this.teachers = options.teachers;
    this.students = options.students;
    this.endDate = options.endDate;
    this.closeReason = options.closeReason;
    this.closeMan = options.closeMan;
  }
}
