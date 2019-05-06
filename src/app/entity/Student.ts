export class Student {
  id: number;
  studentPaperId: string;
  studentId: string;
  studentName: string;
  sex: number;
  birthday: Date;
  schoolId: string;
  address: string ; // 家庭住址
  tel: string;
  headimg: string;
  nickname: string;
  regTime: Date;
  wxcode: string; // 小程序openid
  constructor(options: {id?: number, studentPaperId?: string, studentId?: string, studentName?: string,
                        sex?: number, birthday?: Date, schoolId?: string, address?: string, tel?: string,
                         headimg?: string, nickname?: string, regTime?: Date, wxcode?: string}= {}) {
    this.id = options.id;
    this.studentPaperId = options.studentPaperId || '';
    this.studentId = options.studentId || '';
    this.studentName = options.studentName || '';
    this.sex = options.sex || 1;
    this.birthday = options.birthday;
    this.schoolId = options.schoolId || '';
    this.address = options.address || '';
    this.tel = options.tel || '';
    this.headimg = options.headimg || '';
    this.nickname = options.nickname || '';
    this.regTime = options.regTime;
    this.wxcode = options.wxcode || '';
  }
}
