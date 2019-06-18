import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {SystemParams} from '../../../entity/SystemParams';
import {SysParamsService} from '../../../shared/service/system/sys-params.service';

@Component({
  selector: 'app-guodubi-select',
  templateUrl: './guodubi-select.component.html',
  styleUrls: ['./guodubi-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GuodubiSelectComponent),
    multi: true
  }]
})
export class GuodubiSelectComponent implements OnInit {


 params: SystemParams = new SystemParams();

  private _CURRENTVALUE = 0; // 市州选择 ngModel
  private onValueChangeCallBack: any = {};

  get currentValue(): number {
    return this._CURRENTVALUE;
  }

  set currentValue(value: number) {
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

  constructor(private  paramsvr: SysParamsService) { }

  ngOnInit() {
    this.paramsvr.getParams().subscribe(
        re => this.params = re
    );
  }

}
