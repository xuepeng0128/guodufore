import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-habit-mode-select',
  templateUrl: './habit-mode-select.component.html',
  styleUrls: ['./habit-mode-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HabitModeSelectComponent),
    multi: true
  }]
})
export class HabitModeSelectComponent implements OnInit {
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
