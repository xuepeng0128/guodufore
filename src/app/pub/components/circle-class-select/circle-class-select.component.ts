import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HabitClass} from "../../../entity/HabitClass";
import {HabitClassService} from "../../../shared/service/dic/habit-class.service";
import {map} from "rxjs/operators";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CircleClass} from "../../../entity/CircleClass";
import {CircleClassService} from "../../../shared/service/dic/circle-class.service";
import {Circle} from "../../../entity/Circle";

@Component({
  selector: 'app-circle-class-select',
  templateUrl: './circle-class-select.component.html',
  styleUrls: ['./circle-class-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CircleClassSelectComponent),
    multi: true
  }]
})
export class CircleClassSelectComponent implements OnInit {

  @Input() defaultShow: string;


  circleClassArray$: Observable<Array<CircleClass>>;

  private _CURRENTVALUE: string;
  private onValueChangeCallBack: any = {};


  get currentValue(): string {
    return this._CURRENTVALUE;
  }

  set currentValue(value: string) {
    this._CURRENTVALUE = value;
    this.onValueChangeCallBack(value);
  }


  constructor(private  circleclasssvr: CircleClassService ) { }

  ngOnInit() {
    this.circleClassArray$ = this.circleclasssvr.circleClassList().pipe(
      map( re => {
        return [new CircleClass({circleClassId: '0', circleClassName: this.defaultShow})].concat(
          re.map(
            v => new CircleClass({
              circleClassId : v.circleClassId, circleClassName : v.circleClassName
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
