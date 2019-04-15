import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {City} from '../../../entity/City';
import {DistrictService} from '../../../shared/service/dic/district.service';
import {District} from '../../../entity/District';
import {List} from 'linqts';
import {distinct, flatMap, map, mergeScan, takeLast} from 'rxjs/operators';

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
  cityArray$: Observable<Array<City>>;
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
  constructor(private  districtsvr: DistrictService) { }

  ngOnInit() {
    this.cityArray$ = of(this.districtsvr.getDistrictsStorage()).pipe(
      map(re => [
        new District({city : new City('0', this.defaultShow) })
      ].concat(re)),
      flatMap( (re: Array<District>) => from(re)),
      map( singled => singled.city ),
      distinct(),
      mergeScan((acc, cur) => of([...acc, cur]), new Array<City>()),
      takeLast(1)
    );
  }
  onValueSelected = () => {
    this.onValueChanged.emit(this._CURRENTVALUE);
  }

}
