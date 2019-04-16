import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {concat, iif, Observable, of} from 'rxjs';
import {Nation} from '../../../entity/Nation';
import {map} from 'rxjs/operators';
import {NationService} from '../../../shared/service/dic/nation.service';

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
  public   districtArray$: Observable<Array<Nation>> = new Observable<Array<Nation>>();

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
  constructor(private nationsvr: NationService) { }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.districtArray$ =
    iif( () => this.cityId === '0',
                    of([new Nation({nationId : '0' , nationName: this.defaultShow})]),
                    this.nationsvr.nationList().pipe(
                      map( (re: Array<Nation> ) => [
                        new Nation({nationId : '0', nationName : this.defaultShow })
                      ].concat(re.filter(o => o.nationId.indexOf('00') === -1 && o.nationId.substring(0, 4) === this.cityId.substring(0, 4) )),
                    ))
      );


  }

}
