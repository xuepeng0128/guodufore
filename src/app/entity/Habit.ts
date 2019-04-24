export class Habit {
  habitId: string;
  habitName: string;
  habitClassId: string ;
  habitClassName: string;
  subHabitClassId: string;
  subHabitClassName: string;
  memo: string ; // 文本描述
  // videoUrl: string ; // 视频
  // audioUrl: string; // 音频
 picUrl: string;

  constructor(options: {habitId?: string, habitName?: string, habitClassId?: string, habitClassName?: string,
                         subHabitClassId?: string, subHabitClassName ?: string, memo?: string, picUrl?: string} = {}) {
    this.habitId = options.habitId || '';
    this.habitName = options.habitName || '';
    this.habitClassId = options.habitClassId || '1';
    this.habitClassName = options.habitClassName || '';
    this.subHabitClassId = options.subHabitClassId || '0';
    this.subHabitClassName = options.subHabitClassName || '';
    this.memo = options.memo || '';
    // this.videoUrl = options.videoUrl || '';
    // this.audioUrl = options.audioUrl || '';
    this.picUrl = options.picUrl || '';
  }
}
