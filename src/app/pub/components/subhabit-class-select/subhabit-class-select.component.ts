import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HabitClass} from '../../../entity/HabitClass';
import {HabitClassService} from '../../../shared/service/dic/habit-class.service';
import {map} from 'rxjs/operators';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-subhabit-class-select',
  templateUrl: './subhabit-class-select.component.html',
  styleUrls: ['./subhabit-class-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SubhabitClassSelectComponent),
    multi: true
  }]
})
export class SubhabitClassSelectComponent implements OnInit  , OnChanges {
  @Input() defaultShow: string;
  @Input() pareHabitClassId: string;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pareHabitClassId==='0'){
      this.habitClassArray$ = of ( [new HabitClass({habitClassId: '0', habitClassName: this.defaultShow})]);
    }else {
      this.habitClassArray$ = this.habitclasssvr.habitClassList().pipe(
        map( re => {
          return [new HabitClass({habitClassId: '0', habitClassName: this.defaultShow})].concat(
            re.filter(o => o.pareHabitClassId === this.pareHabitClassId).map(
              v => new HabitClass({
                habitClassId : v.habitClassId, habitClassName : v.habitClassName
              })
            )
          );
        })
      );
    }


    this._CURRENTVALUE = '0';
  }
}
