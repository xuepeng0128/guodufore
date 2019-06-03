import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Nation} from '../../../entity/Nation';
import {NationService} from '../../../shared/service/dic/nation.service';
import {map} from 'rxjs/operators';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-province-select',
  templateUrl: './province-select.component.html',
  styleUrls: ['./province-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ProvinceSelectComponent),
    multi: true
  }]
})
export class ProvinceSelectComponent implements OnInit {
// 默認顯示
  @Input() defaultShow: string;
  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();

  provinceArray$: Observable<Array<Nation>>;

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

  constructor(private  nationsvr: NationService) { }

  ngOnInit() {
    this.provinceArray$ = this.nationsvr.nationList().pipe(
      map( (re: Array<Nation> ) => [
        new Nation({nationId : '0', nationName : this.defaultShow })
      ].concat(re.filter(o => o.nationId.indexOf('00') !== -1 && o.nationId.indexOf('0000') !== -1  ))),

    );
  }

}
