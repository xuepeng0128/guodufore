import {SubExam} from "./SubExam";

export class Exam {
  examId : string ; //考试编号
  studySubjectId : string ; // 学科编号
  studySubjectName : string ; // 学科名称
  examName : string  ;// 考试名称
  teachedTeacherId : string ; // 任教老师编号
  teachedTeacherName : string ; // 任教老师名称
  examTime : Date  ; // 考试时间
  examKindId  : string ; // 考试类别编号
   examKindName : string; // 考试类别名称
  iyear  : number  ; // 考试时所在年级
  term  : string ; // 学期 up 上学期, down 下学期
  classesId  : string  ; // 班级id
  grade  : number ; // 学籍
  classes  : number  ; // 班级
  schoolId : String; //学校id
  totalScore : number; // 满分
  subExams : Array<SubExam>;

  constructor(options : { examId?: string, studySubjectId?: string, studySubjectName?: string, examName?: string,
                         teachedTeacherId?: string, teachedTeacherName?: string, examTime?: Date,
                          examKindId?: string, examKindName?: string, iyear?: number, term?: string, classesId?: string,
                         grade?: number, classes?: number, schoolId?: String,totalScore ? : number, subExams? : Array<SubExam>}={}) {
    this.examId = options.examId || '';
    this.studySubjectId = options.studySubjectId || '';
    this.studySubjectName = options.studySubjectName || '';
    this.examName = options.examName || '';
    this.teachedTeacherId = options.teachedTeacherId || '';
    this.teachedTeacherName = options.teachedTeacherName || '';
    this.examTime = options.examTime || new Date();
    this.examKindId = options.examKindId || '';
    this.examKindName = options.examKindName || '';
    this.iyear = options.iyear || 1;
    this.term = options.term || 'up';
    this.classesId = options.classesId ;
    this.grade = options.grade ;
    this.classes = options.classes;
    this.schoolId = options.schoolId || '';
    this.totalScore =options.totalScore || 100;
    this.subExams=options.subExams;
  }
}
