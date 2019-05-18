export interface ICircleQueryParams {

  circleTitle?: string; // 圈子名称
  schoolId? : string;
  schoolName? : string;
  classesId? : string; // 班级编号
  grade? : number;
  classes? : number;
  classesName? : string;
  buildTeacherId? : string ;// 建圈老师id
  buildTeacherName? : string;
  buildTimeBegin?  : string;// 建圈日期起
   buildTimeEnd?  : string;// 建圈日期起
   closeMan? : string; // 关闭人
     closeTime?  : string ;// 关闭时间
   closeReason?  : string; // 关闭原因
  pageSize? : number;
  pageNo? : number;
  pageBegin? : number
}
