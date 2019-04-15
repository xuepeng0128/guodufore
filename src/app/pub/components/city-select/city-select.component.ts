import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {NG_VALUE_ACCESSOR} from '@angular/forms';



import {distinct, flatMap, map, mergeScan, takeLast} from 'rxjs/operators';
import {Nation} from '../../../entity/Nation';
import {NationService} from '../../../shared/service/dic/nation.service';


@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CitySelectComponent),
    multi: true
  }]
})
export class CitySelectComponent implements OnInit {
// 默認顯示
  @Input() defaultShow: string;
  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();

  cityArray$: Observable<Array<Nation>>;

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
    this.cityArray$ = this.nationsvr.nationList().pipe(
      map( (re: Array<Nation> ) => [
        new Nation({nationId : '0', nationName : this.defaultShow })
      ].concat(re.filter(o => o.nationId.indexOf('00') !== -1 ))),

    );
  }
  onValueSelected = () => {
    this.onValueChanged.emit(this._CURRENTVALUE);
  }

}
