import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {Nation} from '../../../entity/Nation';
import {HabitClass} from '../../../entity/HabitClass';
import {HabitClassService} from '../../../shared/service/dic/habit-class.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-habit-class-select',
  templateUrl: './habit-class-select.component.html',
  styleUrls: ['./habit-class-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HabitClassSelectComponent),
    multi: true
  }]
})
export class HabitClassSelectComponent implements OnInit {

  @Input() defaultShow: string;


  habitClassArray$: Observable<Array<HabitClass>>;

  private _CURRENTVALUE: string;
  private onValueChangeCallBack: any = {};


  get currentValue(): string {
    return this._CURRENTVALUE;
  }

  set currentValue(value: string) {
    this._CURRENTVALUE = value;
    this.onValueChangeCallBack(value);
  }


  constructor(private  habitclasssvr: HabitClassService ) { }

  ngOnInit() {
    this.habitClassArray$ = this.habitclasssvr.habitClassList().pipe(
      map( re => {
          return [new HabitClass({habitClassId: '0', habitClassName: this.defaultShow})].concat(
            re.filter(o => o.pareHabitClassId === '0').map(
               v => new HabitClass({
                    habitClassId : v.habitClassId, habitClassName : v.habitClassName
               })
            )
          );
      })
    );
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
