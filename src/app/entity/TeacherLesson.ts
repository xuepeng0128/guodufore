export class TeacherLesson {
  lessonId : string ;
  lessonTitle : string;
  memo : string;
  guoduCoin : number;
  makeTeacherId : string;
  makeTeackerName : string;
  makeTime : Date;
  schoolId : string;
  schoolName : string;
  publishTime : Date;


  constructor(options :{lessonId?: string, lessonTitle?: string, memo?: string,
                        guoduCoin?: number, makeTeacherId?: string, makeTeackerName?: string,
                        makeTime?: Date, schoolId?: string, schoolName?: string, publishTime?: Date}={}) {
    this.lessonId = options.lessonId || '';
    this.lessonTitle = options.lessonTitle || '';
    this.memo = options.memo || '';
    this.guoduCoin = options.guoduCoin || 0;
    this.makeTeacherId = options.makeTeacherId || '';
    this.makeTeackerName = options.makeTeackerName || '';
    this.makeTime = options.makeTime;
    this.schoolId = options.schoolId || '';
    this.schoolName = options.schoolName || '';
    this.publishTime = options.publishTime;
  }
}
