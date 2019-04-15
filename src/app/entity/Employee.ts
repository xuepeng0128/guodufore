import {CorpDuty} from './CorpDuty';

export class Employee {
  paperId: string;
  employeeName: string;
  tel: string;
  duty: CorpDuty;
  enterDate: Date;
  onDutyState: number;
  leaveDate: Date;


  constructor(options: {paperId?: string, employeeName?: string, tel?: string, duty?: CorpDuty,
                        enterDate?: Date, onDutyState?: number, leaveDate?: Date} = {}) {
    this.paperId = options.paperId || '';
    this.employeeName = options.employeeName || '';
    this.tel = options.tel || '';
    this.duty = options.duty ;
    this.enterDate = options.enterDate || new Date();
    this.onDutyState = options.onDutyState || 1;
    this.leaveDate = options.leaveDate;
  }
}
