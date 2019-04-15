import {Employee} from './Employee';
import {School} from './School';
import {Teacher} from './Teacher';
import {Menu} from './Menu';
import {TrainSchool} from './TrainSchool';

export class User {
  userId: string ;
  account: string; // 账号
  passWord: string; // 密码
  employee: Employee; // 员工用户(为空，非员工用户)
  teacher: Teacher;  // 老师用户
  supperAdmin: boolean; // 是否超级管理员
  schoolAdmin: boolean; // 是否学校，机构管理员
  trainSchoolAdmin: boolean; // 是否学校，机构管理员
  manageSchool: School; // 管理员或老师所在学校
  manageTrainSchool: TrainSchool; // 管理员或老师所在学校
  powerMenu: Array<Menu>;


  constructor(options: {account?: string, passWord?: string, employee?: Employee,
                        teacher?: Teacher, supperAdmin?: boolean, schoolAdmin?: boolean,
                        trainSchoolAdmin?: boolean, manageSchool?: School, manageTrainSchool?: TrainSchool,
                        powerMenu?: Array<Menu>}= {}) {
    this.account = options.account || '';
    this.passWord = options.passWord || '';
    this.employee = options.employee ;
    this.teacher = options.teacher ;
    this.supperAdmin = options.supperAdmin;
    this.schoolAdmin = options.schoolAdmin;
    this.manageSchool = options.manageSchool ;
    this.manageTrainSchool = options.manageTrainSchool;
    this.powerMenu = options.powerMenu ;
  }
}
