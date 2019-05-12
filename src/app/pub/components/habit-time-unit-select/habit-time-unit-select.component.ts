import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-habit-time-unit-select',
  templateUrl: './habit-time-unit-select.component.html',
  styleUrls: ['./habit-time-unit-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HabitTimeUnitSelectComponent),
    multi: true
  }]
})
export class HabitTimeUnitSelectComponent implements OnInit {
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
