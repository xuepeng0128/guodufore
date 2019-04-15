export class TeacherDuty {
  teacherDutyId: string;
  teacherDutyName: string;
  master: boolean;


  constructor(options: {teacherDutyId?: string, teacherDutyName?: string, master?: boolean}= {}) {
    this.teacherDutyId = options.teacherDutyId || '';
    this.teacherDutyName = options.teacherDutyName || '';
    this.master = options.master || false;
  }
}
