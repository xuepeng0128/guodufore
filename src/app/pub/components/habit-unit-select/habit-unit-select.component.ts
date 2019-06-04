import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {HabitUnitService} from '../../../shared/service/dic/habit-unit.service';
import {HabitUnit} from '../../../entity/HabitUnit';

@Component({
  selector: 'app-habit-unit-select',
  templateUrl: './habit-unit-select.component.html',
  styleUrls: ['./habit-unit-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HabitUnitSelectComponent),
    multi: true
  }]
})
export class HabitUnitSelectComponent implements OnInit {

  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();

  habitUnitArray$: Observable<Array<HabitUnit>>;

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

  constructor(private  habitunitsvr: HabitUnitService) { }

  ngOnInit() {
    this.habitUnitArray$ = this.habitunitsvr.habitUnitList().pipe(
      map( (re: Array<HabitUnit> ) => [
        new HabitUnit('请选择')
      ].concat(re))
    );
  }

}
