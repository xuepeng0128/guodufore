export class HabitExam {
  habitExamId: string;
  teacherId: string;
  teacherName: string;
   publishedDate: Date;
  examTitle: string;
  examMemo: string;
  examBeginDate: Date;
  examEndDate: Date;
  totalScore: number;


  constructor(options :{ habitExamId?: string, teacherId?: string, teacherName?: string, publishedDate?: Date,
                         examTitle?: string, examMemo?: string, examBeginDate?: Date, examEndDate?: Date, totalScore?: number}={}) {
    this.habitExamId = options.habitExamId;
    this.teacherId = options.teacherId;
    this.teacherName = options.teacherName;
    this.publishedDate = options.publishedDate;
    this.examTitle = options.examTitle;
    this.examMemo = options.examMemo;
    this.examBeginDate = options.examBeginDate || new Date();
    this.examEndDate = options.examEndDate;
    this.totalScore = options.totalScore || 100;
  }
}
