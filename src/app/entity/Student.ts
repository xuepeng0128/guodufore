export class Student {
  studentPaperId: string;
  studentName: string;
  birthday: Date;
  sex: string;
  address: string;
  tel: string;
  constructor(options: {studentPaperId?: string, studentName?: string, birthday?: Date, sex?: string, address?: string, tel?: string}= {}) {
    this.studentPaperId = options.studentPaperId || '';
    this.studentName = options.studentName || '';
    this.birthday = options.birthday || new Date();
    this.sex = options.sex || '1';
    this.address = options.address || '';
    this.tel = options.tel || '';
  }
}
