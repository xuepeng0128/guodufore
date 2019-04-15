export class Habit {
  habitId: string;
  habitName: string;
  habitClass: string ; // (1,德2.智3.体4.美5.劳)
  memo: string ; // 文本描述
  // videoUrl: string ; // 视频
  // audioUrl: string; // 音频
  // picUrl: string;

  constructor(options: {habitId?: string, habitName?: string, habitClass?: string, memo?: string} = {}) {
    this.habitId = options.habitId || '';
    this.habitName = options.habitName || '';
    this.habitClass = options.habitClass || '1';
    this.memo = options.memo || '';
    // this.videoUrl = options.videoUrl || '';
    // this.audioUrl = options.audioUrl || '';
    // this.picUrl = options.picUrl || '';
  }
}
