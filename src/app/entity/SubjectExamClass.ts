import {StudySubject} from './StudySubject';

// @ts-ignore
export  class SubjectExamClass {
   subjectExamClassId: string;
   subjectExamClassName: string;
     studySubject: StudySubject;


  constructor(options: {subjectExamClassId?: string, subjectExamClassName?: string, studySubject?: StudySubject}= {}) {
    this.subjectExamClassId = options.subjectExamClassId;
    this.subjectExamClassName = options.subjectExamClassName;
    this.studySubject = options.studySubject;
  }
}
