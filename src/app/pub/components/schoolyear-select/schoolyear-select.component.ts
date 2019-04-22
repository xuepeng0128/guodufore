import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-schoolyear-select',
  templateUrl: './schoolyear-select.component.html',
  styleUrls: ['./schoolyear-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SchoolyearSelectComponent),
    multi: true
  }]
})
export class SchoolyearSelectComponent implements OnInit {
  @Input() schoolStyle: number;
  @Input() defaultShow: string;
  private _CURRENTVALUE: string; // 选择 ngModel 绑定
  private onValueChangeCallBack: any = {};


  get currentValue(): string {
    return this._CURRENTVALUE;
  }

  set currentValue(value: string) {
    this._CURRENTVALUE = value;
    this.onValueChangeCallBack(value);
  }


  constructor() { }

  ngOnInit() {
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


}
