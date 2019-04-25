import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {TeacherDuty} from '../../../entity/TeacherDuty';
import {TeacherdutyService} from '../../../shared/service/dic/teacherduty.service';
import {map} from 'rxjs/operators';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-teacherduty-select',
  templateUrl: './teacherduty-select.component.html',
  styleUrls: ['./teacherduty-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TeacherdutySelectComponent),
    multi: true
  }]
})
export class TeacherdutySelectComponent implements OnInit {
// 默認顯示
  @Input() defaultShow: string;
  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();
  teacherDutyArray$: Observable<Array<TeacherDuty>>;
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
  constructor(private teacherDutysvr: TeacherdutyService) { }

  ngOnInit() {
    this.teacherDutyArray$ = this.teacherDutysvr.teacherDutyList().pipe(
      map(
        re =>  [new TeacherDuty({teacherDutyId : '0', teacherDutyName : this.defaultShow, master : false})].concat(re)
      )
    );
  }
  onValueSelected = () => {
    this.onValueChanged.emit(this._CURRENTVALUE);
  }
}
