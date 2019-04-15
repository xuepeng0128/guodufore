import {TeacherOnserve} from './TeacherOnserve';
import {TeacherDuty} from './TeacherDuty';

export class Teacher {
    paperId: string; // 身份证
    tel: string ; // 电话
    teacherName: string ; // 老师姓名
    teacherDuty: TeacherDuty ; // 当前职务
    onserve: TeacherOnserve; // 当前任教
    constructor(options: {paperId?: string, tel?: string, teacherName?: string, teacherDuty?: TeacherDuty, onserve?: TeacherOnserve}= {}) {
      this.paperId = options.paperId || '';
      this.tel = options.tel || '';
      this.teacherName = options.teacherName || '';
      this.teacherDuty = options.teacherDuty ;
      this.onserve = options.onserve || null;
    }
}
