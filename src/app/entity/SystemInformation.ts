export  class SystemInformation {
    id : number ;
   information : string  ;
   sendTime : Date


  constructor(options : {id: number, information: string, sendTime: Date}={}) {
    this.id = options.id;
    this.information = options.information ||'' ;
    this.sendTime = options.sendTime;
  }
}
