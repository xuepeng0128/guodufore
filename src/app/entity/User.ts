

export class User {
  userId: string ;
  account: string; // 账号
  passWord: string; // 密码
  schoolId: string;
  employeeId: string; // 员工用户(为空，非员工用户)
  employeeName: string; // 员工名称
  teacherId: string ;  // 老师用户
  supperAdmin: boolean; // 是否超级管理员
  schoolAdmin: boolean; // 是否学校，机构管理员
  addTime: Date;
  kind: number;

  constructor(options: {userId?: string, account?: string, passWord?: string, schoolId?: string,
                        employeeId?: string, employeeName?: string, teacherId?: string, supperAdmin?: boolean,
                        schoolAdmin?: boolean, addTime?: Date, kind?: number}= {}) {
    this.userId = options.userId;
    this.account = options.account;
    this.passWord = options.passWord;
    this.schoolId = options.schoolId;
    this.employeeId = options.employeeId;
    this.employeeName = options.employeeName;
    this.teacherId = options.teacherId;
    this.supperAdmin = options.supperAdmin || false;
    this.schoolAdmin = options.schoolAdmin || false;
    this.addTime = options.addTime;
    this.kind = options.kind || 1;
  }
}
