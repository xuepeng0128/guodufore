export class Notice {
  noticeId: string;
  noticeContent: string;
  teacherId: string;
  sendTime: Date;
  receiveStudentNums: number;
  haveReadStudentNums: number;

  constructor(options: {noticeId?: string, noticeContent?: string, teacherId?: string,
                        sendTime?: Date, receiveStudentNums?: number, haveReadStudentNums?: number}= {}) {
    this.noticeId = options.noticeId || '';
    this.noticeContent = options.noticeContent || '';
    this.teacherId = options.teacherId || '';
    this.sendTime = options.sendTime;
    this.receiveStudentNums = options.receiveStudentNums || 0;
    this.haveReadStudentNums = options.haveReadStudentNums || 0 ;
  }
}
