export class SubTeacherLesson {
 lessonId: string;
 lessonNo: number;
  lessonNoTitle: string;
 mode: number;
  memo: string;
  picUrl: string;  // 视频开始宣传画
  videoUrl: string;
  audioUrl: string;
   noPay: boolean;
  constructor(options: {lessonId?: string, lessonNo?: number,  lessonNoTitle?: string, mode?: number,
               memo?: string, picUrl?: string, videoUrl?: string, audioUrl?: string, noPay?: boolean}= {}) {
    this.lessonId = options.lessonId || '';
    this.lessonNo = options.lessonNo || 1;
    this.lessonNoTitle = options.lessonNoTitle || '' ;
    this.mode = options.mode || 1;
    this.memo = options.memo  || '';
    this.picUrl = options.picUrl || '';
    this.videoUrl = options.videoUrl || '';
    this.audioUrl = options.audioUrl || '';
    this.noPay = options.noPay || false;
  }
}
