import {CorpDuty} from './CorpDuty';

export class Employee {
  employeeId : string;
  paperId : string;
  employeeName : string;
  tel : string;
  corpDutyId : string ;
  corpDutyName : string;
  enterDate : Date;
  leaveDate :Date;
  wxcode : string;


  constructor(options :{employeeId: string, paperId: string, employeeName: string,
                        tel: string, corpDutyId: string, corpDutyName: string,
                         enterDate: Date, leaveDate: Date, wxcode: string}={}) {
    this.employeeId = options.employeeId || '';
    this.paperId = options.paperId || '';
    this.employeeName = options.employeeName || '';
    this.tel = options.tel || '';
    this.corpDutyId = options.corpDutyId || '';
    this.corpDutyName = options.corpDutyName || '';
    this.enterDate = options.enterDate || new Date();
    this.leaveDate = options.leaveDate;
    this.wxcode = options.wxcode ||'';
  }
}
