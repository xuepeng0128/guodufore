export class HabitTemplate {
  habitTemplateId: string;
  habitTemplateName: string;
  habitClassId: string ;
  habitClassName: string;
  subHabitClassId: string;
  subHabitClassName: string;
  icon: string;
  color: string;
  memo: string ; // 文本描述
 picUrl: string;
  perTime: number;
  timeUnit: string;
  mode: number;
  timeModeNum: string;
  countModeNum: number;
  valueModeNum: number;
   unitName: string;
  constructor(options: {habitTemplateId?: string, habitTemplateName?: string, habitClassId?: string, habitClassName?: string,
                         subHabitClassId?: string, subHabitClassName ?: string, icon?: string, color?: string, memo?: string, picUrl?: string,
                          perTime?: number, timeUnit?: string, mode?: number, timeModeNum?: string, countModeNum?: number,
                         valueModeNum?: number, unitName?: string } = {}) {
    this.habitTemplateId = options.habitTemplateId || '';
    this.habitTemplateName = options.habitTemplateName || '';
    this.habitClassId = options.habitClassId || '0';
    this.habitClassName = options.habitClassName || '';
    this.subHabitClassId = options.subHabitClassId || '0';
    this.subHabitClassName = options.subHabitClassName || '';
    this.icon = options.icon || '';
    this.color = options.color || '#000';
    this.memo = options.memo || '';
    this.picUrl = options.picUrl || '';
    this.perTime = options.perTime || 1;
    this.timeUnit = options.timeUnit || '天';
    this.mode = options.mode || 1;
    this.timeModeNum = options.timeModeNum || '00:30:00';
    this.countModeNum = options.countModeNum || 1;
    this.valueModeNum = options.valueModeNum || 1;
    this.unitName = options.unitName || '';

  }
}
