import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {CorpDuty} from '../../../entity/CorpDuty';
import {map} from 'rxjs/operators';
import {CorpdutyService} from '../../../shared/service/dic/corpduty.service';

@Component({
  selector: 'app-corp-duty-select',
  templateUrl: './corp-duty-select.component.html',
  styleUrls: ['./corp-duty-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CorpDutySelectComponent),
    multi: true
  }]
})
export class CorpDutySelectComponent implements OnInit {
// 默認顯示
  @Input() defaultShow: string;
  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();
  corpDutyArray$: Observable<Array<CorpDuty>>;
  private _CURRENTVALUE = '0'; // 市州选择 ngModel
  private onValueChangeCallBack: any = {};

  get currentValue(): string {
    return this._CURRENTVALUE;
  }

  set currentValue(value: string) {
    this._CURRENTVALUE = value;
    this.onValueChangeCallBack(value);
  }



  writeValue(obj: any): void {
    if (obj) {
      this._CURRENTVALUE = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onValueChangeCallBack = fn;
  }

  registerOnTouched(fn: any): void {
  }
  constructor(private corpDutysvr: CorpdutyService) { }

  ngOnInit() {
    this.corpDutyArray$ = this.corpDutysvr.corpDutyList().pipe(
      map(
      re =>  [new CorpDuty({corpDutyId : '0', corpDutyName : this.defaultShow, master : false})].concat(re)
         )
    );
  }
  onValueSelected = () => {
    this.onValueChanged.emit(this._CURRENTVALUE);
  }
}
