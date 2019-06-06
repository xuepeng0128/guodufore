export class TeacherNotice {
   teacherNoticeId: string ;
    buildDate: Date ;
   memo: string ;
   sendCircleIds: string ;
  sendCircleTitles: string ;
   buildTeacherId: string ;
  buildTeacherName: string ;
  schoolId: string;
  constructor(options: {teacherNoticeId?: string, buildDate?: Date, memo?: string, sendCircleIds?: string,
                         sendCircleTitles?: string, buildTeacherId?: string, buildTeacherName?: string, schoolId?: string}= {}) {
    this.teacherNoticeId = options.teacherNoticeId;
    this.buildDate = options.buildDate;
    this.memo = options.memo;
    this.sendCircleIds = options.sendCircleIds;
    this.sendCircleTitles = options.sendCircleTitles;
    this.buildTeacherId = options.buildTeacherId;
    this.buildTeacherName = options.buildTeacherName;
    this.schoolId = options.schoolId || '';
  }
}
