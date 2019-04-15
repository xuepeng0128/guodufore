import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {concat, Observable, of} from 'rxjs';
import {City} from '../../../entity/City';
import {District} from '../../../entity/District';
import {DistrictService} from '../../../shared/service/dic/district.service';

@Component({
  selector: 'app-district-select',
  templateUrl: './district-select.component.html',
  styleUrls: ['./district-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DistrictSelectComponent),
    multi: true
  }]
})
export class DistrictSelectComponent implements OnInit , OnChanges {
  // 默認顯示
  @Input() defaultShow: string;
  @Input() cityId: string ; // 选择的市州
  private _CURRENTVALUE = '0'; // 区县选择 ngModel
  private onValueChangeCallBack: any = {};

  // 区县列表
  public   districtArray: Array<District> = new Array<District>();

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
  constructor(private districtsvr: DistrictService) { }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let arealist: Array<District> = new Array<District>();
    if (this.cityId === '0') {
      arealist = new Array<District>();
    } else {
      // 根据市州id 过滤出所属区县
      arealist = this.districtsvr.getDistrictsStorage().filter(o => o.city.cityId === this.cityId);
    }
    this._CURRENTVALUE = '0';

    arealist.splice(0, 0, new District({districtId : '0', districtName: this.defaultShow}));
    this.districtArray = arealist;

  }

}
