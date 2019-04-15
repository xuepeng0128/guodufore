export class CorpDuty {
    corpDutyId: string;
    corpDutyName: string;
    master: boolean;

  constructor(options: {corpDutyId?: string, corpDutyName?: string, master?: boolean}= {}) {
    this.corpDutyId = options.corpDutyId || '' ;
    this.corpDutyName = options.corpDutyName || '';
    this.master = options.master || false;
  }
}
