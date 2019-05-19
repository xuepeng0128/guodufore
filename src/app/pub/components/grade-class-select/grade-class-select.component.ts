import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CircleClass} from "../../../entity/CircleClass";
import {CircleClassService} from "../../../shared/service/dic/circle-class.service";
import {map} from "rxjs/operators";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Classes} from "../../../entity/Classes";
import {CommonService} from "../../../shared/common.service";

@Component({
  selector: 'app-grade-class-select',
  templateUrl: './grade-class-select.component.html',
  styleUrls: ['./grade-class-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GradeClassSelectComponent),
    multi: true
  }]
})
export class GradeClassSelectComponent implements OnInit {

  @Input()   classesArray: Observable<Array<Classes>>;
  @Input() schoolStyle : number;
  private _CURRENTVALUE: string;
  private onValueChangeCallBack: any = {};


  get currentValue(): string {
    return this._CURRENTVALUE;
  }

  set currentValue(value: string) {
    this._CURRENTVALUE = value;
    this.onValueChangeCallBack(value);
  }


  constructor(private  circleclasssvr: CircleClassService,public commonsvr : CommonService ) { }

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
