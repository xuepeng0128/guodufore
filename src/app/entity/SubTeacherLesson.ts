export class SubTeacherLesson {
 lessonId : string;
 lessonNo : number;
  memo : string;
  videoUrl : string;
  audioUrl : string;
   noPay : boolean;


  constructor(options:{lessonId?: string, lessonNo?: number, memo?: string, videoUrl?: string, audioUrl?: string, noPay?: boolean}={}) {
    this.lessonId = options.lessonId || '';
    this.lessonNo = options.lessonNo || 1;
    this.memo = options.memo ;
    this.videoUrl = options.videoUrl;
    this.audioUrl = options.audioUrl;
    this.noPay = options.noPay || false;
  }
}
