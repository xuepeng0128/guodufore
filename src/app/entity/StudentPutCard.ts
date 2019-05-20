export class StudentPutCard {
   habitId: string;
   studentId: string ;
   shouldPutCardDateBegin: Date ;
   shouldPutCardDateEnd: Date ;
   canGetGuodubi: number;
   haveGuodubi: number;
   upperLimitGuodubi: boolean;
  canGetScore: number;
   haveScore: number;
  putCardTime: Date;
   putCardMemo: string;
  putCardPicUrls: string;
   putCardaudioUrls: string;
  putCardvideoUrls: string;
   shouldFinish: number;
  haveFinish: number;
  finished: boolean;
  remark: string;


  constructor(options: {habitId?: string, studentId?: string, shouldPutCardDateBegin?: Date,
                        shouldPutCardDateEnd?: Date, canGetGuodubi?: number, haveGuodubi?: number,
                        upperLimitGuodubi?: boolean, canGetScore?: number, haveScore?: number, putCardTime?: Date,
                        putCardMemo?: string, putCardPicUrls?: string, putCardaudioUrls?: string, putCardvideoUrls?: string,
                        shouldFinish?: number, haveFinish?: number, finished?: boolean, remark?: string}= {}) {
    this.habitId = options.habitId;
    this.studentId = options.studentId;
    this.shouldPutCardDateBegin = options.shouldPutCardDateBegin;
    this.shouldPutCardDateEnd = options.shouldPutCardDateEnd;
    this.canGetGuodubi = options.canGetGuodubi;
    this.haveGuodubi = options.haveGuodubi;
    this.upperLimitGuodubi = options.upperLimitGuodubi;
    this.canGetScore = options.canGetScore;
    this.haveScore = options.haveScore;
    this.putCardTime = options.putCardTime;
    this.putCardMemo = options.putCardMemo;
    this.putCardPicUrls = options.putCardPicUrls;
    this.putCardaudioUrls = options.putCardaudioUrls;
    this.putCardvideoUrls = options.putCardvideoUrls;
    this.shouldFinish = options.shouldFinish;
    this.haveFinish = options.haveFinish;
    this.finished = options.finished;
    this.remark = options.remark;
  }
}
