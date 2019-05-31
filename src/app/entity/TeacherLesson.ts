export class TeacherLesson {
  lessonId: string ;
  lessonTitle: string;
  memo: string;
  guoduCoin: number;
  makeTeacherId: string;
  makeTeackerName: string;
  makeTime: Date;
  schoolId: string;
  schoolName: string;
  publishTime: Date;
  habitNum: number;


  constructor(options: {lessonId?: string, lessonTitle?: string, memo?: string,
                        guoduCoin?: number, makeTeacherId?: string, makeTeackerName?: string,
                        makeTime?: Date, schoolId?: string, schoolName?: string, publishTime?: Date, habitNum?: number}= {}) {
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
    this.habitNum = options.habitNum || 0 ;
  }
}
