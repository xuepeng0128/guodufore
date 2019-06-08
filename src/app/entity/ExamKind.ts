export class ExamKind {
    examKindId? : string;
    examKindName? : string;


  constructor(options : {examKindId?: string, examKindName?: string} ={}) {
    this.examKindId = options.examKindId ||'';
    this.examKindName = options.examKindName || '';
  }
}
