export class Student {
  paperId: string;
  studentName: string;
  birthday: Date;
  sex: string;
  address: string;
  tel: string;
  constructor(options: {paperId?: string, studentName?: string, birthday?: Date, sex?: string, address?: string, tel?: string}= {}) {
    this.paperId = options.paperId || '';
    this.studentName = options.studentName || '';
    this.birthday = options.birthday || new Date();
    this.sex = options.sex || '1';
    this.address = options.address || '';
    this.tel = options.tel || '';
  }
}
