export class Habit {
  habitId: string;
  grade: number;
  classes: number;
  circleId: string;
  circleTitle: string;
  habitClassId: string;
  habitClassName: string;
  subHabitClassId: string;
  subHabitClassName: string;
  icon: string;
  color: string;
  habitName: string;
  memo: string;
  picUrl: string;
  pirTime: number;
  timeUnit: string;
  mode: number;
  timeModeNum: string;
  countModeNum: number;
  valueModeNum: number;
  unitName: string;
  guoduCoin: number;
  score: number;
  habitExamId: string;
  examTitle: string;
  totalScore: number;
  buildTime: Date;
  buildTeacherId: string;
  buildStudentId: string;
  putCardBeginDate: Date;
  putCardEndDate: Date;
  joinStudents: number;

  constructor(options: { habitId?: string, grade?: number, classes?: number, circleId?: string, circleName?: string, habitClassId?: string, habitClassName?: string, subHabitClassId?: string,
              subHabitClassName?: string , icon?: string, color?: string, habitName?: string, memo?: string, picUrl?: string,
              pirTime?: number, timeUnit?: string, mode?: number, timeModeNum?: string, countModeNum?: number,
              valueModeNum?: number, unitName?: string, guoduCoin?: number, score?: number, habitExamId?: string, examTitle?: string, totalScore?: number,
              buildTime?: Date, buildTeacherId?: string, buildStudentId?: string, putCardBeginDate?: Date, putCardEndDate?: Date, joinStudents?: number } = {}) {
    this.habitId = options.habitId || '';
    this.grade = options.grade ;
    this.circleId = options.circleId || '';
    this.circleTitle = options.circleName || '';
    this.habitClassId = options.habitClassId || '';
    this.habitClassName = options.habitClassName || '';
    this.subHabitClassId = options.subHabitClassId || '';
    this.subHabitClassName = options.subHabitClassName || '';
    this.icon = options.icon || '';
    this.color = options.color || '';
    this.habitName = options.habitName || '';
    this.memo = options.memo || '';
    this.picUrl = options.picUrl || '';
    this.pirTime = options.pirTime || 1;
    this.timeUnit = options.timeUnit || '';
    this.mode = options.mode || 1;
    this.timeModeNum = options.timeModeNum  || '';
    this.countModeNum = options.countModeNum || 1;
    this.valueModeNum = options.valueModeNum || 1;
    this.unitName = options.unitName || '';
    this.guoduCoin = options.guoduCoin || 0 ;
    this.score = options.score ;
    this.habitExamId = options.habitExamId ;
    this.examTitle = options.examTitle ;
    this.totalScore = options.totalScore;
    this.buildTime = options.buildTime ;
    this.buildTeacherId = options.buildTeacherId || '';
    this.buildStudentId = options.buildStudentId || '';
    this.putCardBeginDate = options.putCardBeginDate || new Date();
    this.putCardEndDate = options.putCardEndDate || new Date();
    this.joinStudents = options.joinStudents || 0;
  }
}
