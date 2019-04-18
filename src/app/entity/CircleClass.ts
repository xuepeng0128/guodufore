export class CircleClass {
  circleClassId: string;
  pareClassId: string;
  circleClassName: string;
  icon: string ;
  memo: string ;


  constructor(options: {circleClassId?: string, pareClassId?: string, circleClassName?: string, icon?: string, memo?: string}= {}) {
    this.circleClassId = options.circleClassId || '';
    this.pareClassId = options.pareClassId || '';
    this.circleClassName = options.circleClassName || '';
    this.icon = options.icon || '';
    this.memo = options.memo || '';
  }
}
