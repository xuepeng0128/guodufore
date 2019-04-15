import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YearSelectComponent),
    multi: true
  }]
})
export class YearSelectComponent implements OnInit {

  private _currentValue : string; //选择 ngModel 绑定
  private onValueChangeCallBack: any = {};


  get currentValue(): string {
    return this._currentValue;
  }

  set currentValue(value: string) {
    this._currentValue = value;
    this.onValueChangeCallBack(value);
  }


  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    if (obj)
    {
      this._currentValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onValueChangeCallBack = fn;
  }
  registerOnTouched(fn: any): void {
  }

}
