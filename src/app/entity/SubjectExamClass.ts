import {StudySubject} from './StudySubject';

// @ts-ignore
export  class SubjectExamClass {
   subjectExamClassId: string;
   subjectExamClassName: string;
   studySubjectId: string;
   studySubjectName : string;
  constructor(options: {subjectExamClassId?: string, subjectExamClassName?: string, studySubjectId?: string,studySubjectName ? : string}= {}) {
    this.subjectExamClassId = options.subjectExamClassId || '';
    this.subjectExamClassName = options.subjectExamClassName || '';
    this.studySubjectId = options.studySubjectId || '';
    this.studySubjectName = options.studySubjectName || '';
  }
}
