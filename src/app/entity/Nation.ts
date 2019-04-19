// 区域
export  class Nation {
   nationId : string;
   nationName : string;

  constructor(options : {nationId?: string, nationName?: string}={}) {
    this.nationId = options.nationId || '';
    this.nationName = options.nationName || '';
  }
}
