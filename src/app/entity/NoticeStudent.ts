export class NoticeStudent {
  noticeId: string;
  studentId: string;
  studentName: string;
  receiveTime: Date;


  constructor(options: {noticeId?: string, studentId?: string, studentName?: string, receiveTime?: Date}= {}) {
    this.noticeId = options.noticeId || '';
    this.studentId = options.studentId || '';
    this.studentName = options.studentName || '';
    this.receiveTime = options.receiveTime;
  }
}
