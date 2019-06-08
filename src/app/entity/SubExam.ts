export class SubExam {
  id : number;
  examId : string; // 考试编号
  studentId : string; //学号
  studentIdShow : boolean; // 是否显示
  studentName : string; // 名称
  studentNameShow: boolean; //是否再表格中显示
  subjectExamClassId : string ; // 题型编号
  subjectExamClassName : string;  // 题型名称
  subjectExamClassNameshow : boolean; // 是否再表格中显示
  defficulty : number; // 难易度 1.容易，2.普通，3.困难
  score : number;  // 得分
  getScore : number; // 满分


  constructor(options :{id?: number, examId?: string, studentId?: string, studentIdShow?: boolean,
                        studentName?: string, studentNameShow?: boolean, subjectExamClassId?: string,
                        subjectExamClassName?: string, subjectExamClassNameshow?: boolean, defficulty?: number,
                        score?: number, getScore?: number}={}) {
    this.id = options.id || 0;
    this.examId = options.examId || '';
    this.studentId = options.studentId || '';
    this.studentIdShow = options.studentIdShow  || false ;
    this.studentName = options.studentName || '';
    this.studentNameShow = options.studentNameShow || false;
    this.subjectExamClassId = options.subjectExamClassId || '';
    this.subjectExamClassName = options.subjectExamClassName || '';
    this.subjectExamClassNameshow = options.subjectExamClassNameshow || false;
    this.defficulty = options.defficulty || 1;
    this.score = options.score || 0;
    this.getScore = options.getScore || 0;
  }
}
