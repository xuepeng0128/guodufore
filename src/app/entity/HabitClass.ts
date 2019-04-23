export class HabitClass {
  habitClassId :string;
   habitClassName : string;
   pareHabitClassId : string ;


  constructor(options :{habitClassId?: string, habitClassName?: string, pareHabitClassId?: string}={}) {
    this.habitClassId = options.habitClassId || '';
    this.habitClassName = options.habitClassName || '';
    this.pareHabitClassId = options.pareHabitClassId || '0';
  }
}
