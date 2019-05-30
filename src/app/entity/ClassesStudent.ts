export class ClassesStudent {
  classesId: string;
  studentId: string;
  studentName: string;
  studentPaperId: string;
  sex: number;
  birthday: Date;
  schoolId: string;
  address: string ; // 家庭住址
  tel: string;
  headimg: string;
  nickname: string;
  wxcode: string; // 小程序openid
  regTime: Date;
  endTime: Date;
  inviteCode: string;
  constructor(options: {classesId?: string, studentId?: string,  studentPaperId?: string,
                                 sex?: number, birthday?: Date, schoolId?: string, address?: string ,
                                tel?: string, headimg?: string, nickname?: string, wxcode?: string,  regTime?: Date, endTime?: Date, inviteCode?: string}= {}) {
    this.classesId = options.classesId || '';
    this.studentId = options.studentId || '';
    this.studentPaperId = options.studentPaperId || '';
    this.sex = options.sex || 1;
    this.birthday = options.birthday ;
    this.schoolId = options.schoolId || '';
    this.address = options.address || '';
    this.tel = options.tel || '';
    this.headimg = options.headimg || '';
    this.nickname = options.nickname || '';
    this.wxcode = options.wxcode || '';
    this.regTime = options.regTime || new Date();
    this.endTime = options.endTime;
    this.inviteCode = options.inviteCode || '';
  }
}
