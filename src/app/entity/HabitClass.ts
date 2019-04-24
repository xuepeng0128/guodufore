export class HabitClass {
  habitClassId: string;
   habitClassName: string;
   pareHabitClassId: string ;
   pareHabitClassName: string;

  constructor(options: {habitClassId?: string, habitClassName?: string, pareHabitClassId?: string, pareHabitClassName?: string}= {}) {
    this.habitClassId = options.habitClassId || '';
    this.habitClassName = options.habitClassName || '';
    this.pareHabitClassId = options.pareHabitClassId || '0';
    this.pareHabitClassName = options.pareHabitClassName || '';
  }
}
