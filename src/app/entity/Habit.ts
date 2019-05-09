export class Habit {
  habitId: string;
  circleId: string;
  habitClassId: string;
  subHabitClassId: string;
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
  putCardExamId: string;
  buildTime: Date;
  buildTeacherId: string;
  buildStudentId: string;


  constructor(options: { habitId?: string, circleId?: string, habitClassId?: string, subHabitClassId?: string,
              icon?: string, color?: string, habitName?: string, memo?: string, picUrl?: string,
              pirTime?: number, timeUnit?: string, mode?: number, timeModeNum?: string, countModeNum?: number,
              valueModeNum?: number, unitName?: string, guoduCoin?: number, score?: number, putCardExamId?: string,
              buildTime?: Date, buildTeacherId?: string, buildStudentId?: string } = {}) {
    this.habitId = options.habitId || '';
    this.circleId = options.circleId || '';
    this.habitClassId = options.habitClassId || '';
    this.subHabitClassId = options.subHabitClassId || '';
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
    this.score = options.score || 0;
    this.putCardExamId = options.putCardExamId || '';
    this.buildTime = options.buildTime ;
    this.buildTeacherId = options.buildTeacherId || '';
    this.buildStudentId = options.buildStudentId || '';
  }
}
