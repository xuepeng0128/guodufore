export class StudySubject {
     studySubjectId: string;
     studySubjectName: string;
     habitClassId: string ;
     habitClassName: string;
     subHabitClassId: string;
     subHabitClassName: string;
     primarySchool: boolean;
     middleSchool: boolean;
  constructor(options: {studySubjectId?: string, studySubjectName?: string, habitClassId?: string, habitClassName?: string,
              subHabitClassId?: string , subHabitClassName ?: string, primarySchool?: boolean, middleSchool?: boolean}= {}) {
    this.studySubjectId = options.studySubjectId || '';
    this.studySubjectName = options.studySubjectName || '';
    this.habitClassId = options.habitClassId || '1';
    this.habitClassName = options.habitClassName || '';
    this.subHabitClassId = options.subHabitClassId || '';
    this.subHabitClassName = options.subHabitClassName || '';
    this.primarySchool = options.primarySchool || true;
    this.middleSchool = options.middleSchool || false;
  }
}
