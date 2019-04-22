export class StudySubject {
     studySubjectId: number;
     studySubjectName: string;
     habitClass: number ;
     bSchool: number;
  constructor(studySubjectId?: number, studySubjectName?: string, habitClass?: number, bSchool?: number) {
    this.studySubjectId = studySubjectId || 0;
    this.studySubjectName = studySubjectName || '';
    this.habitClass = habitClass || 0;
    this.bSchool = bSchool || 0;
  }
}
