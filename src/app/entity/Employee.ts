import {CorpDuty} from './CorpDuty';

export class Employee {
  employeeId: string;
  employeePaperId: string;
  employeeName: string;
  tel: string;
  corpDutyId: string ;
  corpDutyName: string;
  address: string;
  enterDate: Date;
  leaveDate: Date;
  wxcode: string;


  constructor(options: {employeeId?: string, employeePaperId?: string, employeeName?: string,
                        tel?: string, corpDutyId?: string, corpDutyName?: string, address?: string,
                         enterDate?: Date, leaveDate?: Date, wxcode?: string}= {}) {
    this.employeeId = options.employeeId || '';
    this.employeePaperId = options.employeePaperId || '';
    this.employeeName = options.employeeName || '';
    this.tel = options.tel || '';
    this.corpDutyId = options.corpDutyId || '';
    this.corpDutyName = options.corpDutyName || '';
    this.address = options.address || '';
    this.enterDate = options.enterDate || new Date();
    this.leaveDate = options.leaveDate;
    this.wxcode = options.wxcode || '';
  }
}
