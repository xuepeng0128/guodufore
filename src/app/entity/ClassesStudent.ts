export class ClassesStudent {
  classesId: string;
  studentId: string;
  studentName : string;
  regTime: Date;
  endTime: Date;

  constructor(options: {classesId?: string, studentId?: string, regTime?: Date, endTime?: Date}= {}) {
    this.classesId = options.classesId || '';
    this.studentId = options.studentId || '';
    this.regTime = options.regTime || new Date();
    this.endTime = options.endTime;
  }
}
