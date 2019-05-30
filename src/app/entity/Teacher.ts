export class Teacher {
    teacherId: string; // 老师编号
    teacherPaperId: string; // 身份证
    tel: string ; // 电话
    teacherName: string ; // 老师姓名
    teacherDutyId: string ; // 当前职务
    teacherDutyName: string ;
    master: boolean;
    address: string; // 当前任教
   schoolId: string;
   schoolName : string;
   regTime: Date;

  constructor(options: { teacherId?: string, teacherPaperId?: string, tel?: string, teacherName?: string, teacherDutyId?: string,
                          master?: boolean , teacherDutyName?: string, address?: string, schoolId?: string,schoolName? : string, regTime?: Date}= {}) {
    this.teacherId = options.teacherId || '';
    this.teacherPaperId = options.teacherPaperId || '';
    this.tel = options.tel || '';
    this.teacherName = options.teacherName || '';
    this.teacherDutyId = options.teacherDutyId || '';
    this.teacherDutyName = options.teacherDutyName || '';
    this.master = options.master || false;
    this.address = options.address || '';
    this.schoolId = options.schoolId || '';
    this.schoolName=options.schoolName || '';
    this.regTime = options.regTime;
  }
}
