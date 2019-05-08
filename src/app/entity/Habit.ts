export class Habit {
  habitId:string;
  circleId: string;
  habitClassId : string;
  subHabitClassId : string;
  icon : string;
  color : string;
  habitName : string;
  memo : string;
  picUrl : string;
  pirTime : number;
  timeUnit : string;
  mode : number;
  timeModeNum : string;
  countModeNum : number;
  valueModeNum :number;
  unitName : string;
  guoduCoin : number;
  score   : number;
  putCardExamId : string;
  buildTime : Date;
  buildTeacherId : string;
  buildStudentId : string;


  constructor(habitId: string, circleId: string, habitClassId: string, subHabitClassId: string,
                icon: string, color: string, habitName: string, memo: string, picUrl: string,
                pirTime: number, timeUnit: string, mode: number, timeModeNum: string, countModeNum: number,
                valueModeNum: number, unitName: string, guoduCoin: number, score: number, putCardExamId: string,
                buildTime: Date, buildTeacherId: string, buildStudentId: string) {
    this.habitId = habitId;
    this.circleId = circleId;
    this.habitClassId = habitClassId;
    this.subHabitClassId = subHabitClassId;
    this.icon = icon;
    this.color = color;
    this.habitName = habitName;
    this.memo = memo;
    this.picUrl = picUrl;
    this.pirTime = pirTime;
    this.timeUnit = timeUnit;
    this.mode = mode;
    this.timeModeNum = timeModeNum;
    this.countModeNum = countModeNum;
    this.valueModeNum = valueModeNum;
    this.unitName = unitName;
    this.guoduCoin = guoduCoin;
    this.score = score;
    this.putCardExamId = putCardExamId;
    this.buildTime = buildTime;
    this.buildTeacherId = buildTeacherId;
    this.buildStudentId = buildStudentId;
  }
}
