export class TeacherLesson {
  lessonId: string ;
  lessonTitle: string;
  memo: string;
  guoduCoin: number;
  makeTeacherId: string;
  makeTeacherName: string;
  makeTime: Date;
  schoolId: string;
  schoolName: string;
  publishTime: Date;
  habitId: string;
  habitName: string;
  circleId: string;
  circleTitle: string;
  picUrl: string;

  constructor(options: {lessonId?: string, lessonTitle?: string, memo?: string,
                        guoduCoin?: number, makeTeacherId?: string, makeTeacherName?: string,
                        makeTime?: Date, schoolId?: string, schoolName?: string, publishTime?: Date, habitId?: string,
                       habitName?: string, circleId?: string, circleTitle?: string, picUrl?: string}= {}) {
    this.lessonId = options.lessonId || '';
    this.lessonTitle = options.lessonTitle || '';
    this.memo = options.memo || '';
    this.guoduCoin = options.guoduCoin || 0;
    this.makeTeacherId = options.makeTeacherId || '';
    this.makeTeacherName = options.makeTeacherName || '';
    this.makeTime = options.makeTime;
    this.schoolId = options.schoolId || '';
    this.schoolName = options.schoolName || '';
    this.publishTime = options.publishTime;
    this.habitId = options.habitId || '';
    this.habitName = options.habitName || '';
    this.circleId = options.circleId || '' ;
    this.circleTitle = options.circleTitle || '';
    this.picUrl = options.picUrl;
  }
}
