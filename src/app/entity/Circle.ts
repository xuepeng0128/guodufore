import { School } from './School';
import { Teacher } from './Teacher';
import { Student } from './Student';
import {TrainSchool} from './TrainSchool';
import {Classes} from './Classes';

export class Circle {
  circleId: string ; // 圈子编号
circleTitle: string ; // 圈子标题
  subTitle: string ; // 副标题
 circleClassId: string ; // 类别
  circleClassName: string ; // 类别名称
  schoolId: string ; // 所属学校
  schoolName: string ; // 所属学校名称
  classesId: string ; // 班级编号
  grade: number ; // 学籍
  classes: number ; // 班级
  classesName: string ; // 班级名称
 buildTeacherId: string ; // 建圈老师id
  buildTeacherName: string ;

  buildTime: Date ; // 建圈日期
   memo: string ; // 圈子介绍
   picUrl: string ; // 宣传海报
   closeMan: string ; // 关闭人

 closeTime: Date ; // 关闭时间
   closeReason: string ; // 关闭原因
  circleProperty: number ; // 圈子性质 1.私有 2.公开


  constructor(options: {circleId: string, circleTitle: string, subTitle: string, circleClassId: string,
                         circleClassName: string, schoolId: string, schoolName: string, classesId: string,
                         grade: number, classes: number, classesName: string, buildTeacherId: string,
                        buildTeacherName: string, buildTime: Date, memo: string, picUrl: string, closeMan: string,
                        closeTime: Date, closeReason: string, circleProperty: number} = {}) {
    this.circleId = options.circleId;
    this.circleTitle = options.circleTitle;
    this.subTitle = options.subTitle;
    this.circleClassId = options.circleClassId;
    this.circleClassName = options.circleClassName;
    this.schoolId = options.schoolId;
    this.schoolName = options.schoolName;
    this.classesId = options.classesId;
    this.grade = options.grade;
    this.classes = options.classes;
    this.classesName = options.classesName;
    this.buildTeacherId =  options.buildTeacherId;
    this.buildTeacherName =  options.buildTeacherName;
    this.buildTime =  options.buildTime;
    this.memo =  options.memo;
    this.picUrl = options.picUrl;
    this.closeMan =  options.closeMan;
    this.closeTime =  options.closeTime;
    this.closeReason =  options.closeReason;
    this.circleProperty =  options.circleProperty || 1;
  }
}
