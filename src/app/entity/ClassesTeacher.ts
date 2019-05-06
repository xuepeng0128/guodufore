export class ClassesTeacher {
  id: number;
  classesId: string;
  teacherId: string;
  teacherName: string;
  studySubjectId: string;
  studySubjectName: string;
  schoolStyle: number;
  regTime: Date;
  endTime: Date;


  constructor(options: {id?: number, classesId?: string, teacherId?: string, teacherName?: string,
                       studySubjectId?: string, studySubjectName?: string, schoolStyle?: number, regTime?: Date, endTime?: Date } = {}) {
    this.id = options.id ;
    this.classesId = options.classesId || '';
    this.teacherId = options.teacherId || '';
    this.teacherName = options.teacherName || '';
    this.studySubjectId = options.studySubjectId || '';
    this.studySubjectName = options.studySubjectName || '';
    this.schoolStyle = options.schoolStyle || 1;
    this.regTime = options.regTime || new Date();
    this.endTime = options.endTime;
  }
}
