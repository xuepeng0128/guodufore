export class StudySubject {
     studySubjectId: string;
     studySubjectName: string;
     habitClass: string ;

  constructor(studySubjectId?: string, studySubjectName?: string, habitClass?: string) {
    this.studySubjectId = studySubjectId || '';
    this.studySubjectName = studySubjectName || '';
    this.habitClass = habitClass || '1';
  }
}
