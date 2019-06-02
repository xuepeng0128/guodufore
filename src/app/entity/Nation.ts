// 行政区划
export  class Nation {
   nationId : string; // 区划编号
   nationName : string; // 区划名称

  constructor(options : {nationId?: string, nationName?: string}={}) {
    this.nationId = options.nationId || '';
    this.nationName = options.nationName || '';
  }
}
