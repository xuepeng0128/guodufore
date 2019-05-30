export class Student {
  id: number; // id
  studentPaperId: string; // 身份证号
  studentId: string; // 学籍号
  studentName: string; // 名称
  sex: number; // 性别 1.男，2.女
  birthday: Date; // 出生日期
  schoolId: string; // 学校编号
  schoolName: string; // 学校名称
  address: string ; // 家庭住址
  tel: string; // 联系电话
  headimg: string; // 头像
  nickname: string; // 昵称
  regTime: Date; // 入校时间
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
