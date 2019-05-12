export class Notice {
  noticeId : string;
  noticeContent : string;
  teacherId : string;
  sendTime: Date;
  receiveStudentNums : number;


  constructor(options :{noticeId: string, noticeContent: string, teacherId: string,
                        sendTime: Date, receiveStudentNums: number}={}) {
    this.noticeId = options.noticeId || '';
    this.noticeContent = options.noticeContent || '';
    this.teacherId = options.teacherId || '';
    this.sendTime = options.sendTime;
    this.receiveStudentNums = options.receiveStudentNums || 0;
  }
}
