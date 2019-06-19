import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ExamKindService} from '../../../shared/service/dic/exam-kind.service';
import {Observable} from 'rxjs';
import {ExamKind} from '../../../entity/ExamKind';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-exam-kind-select',
  templateUrl: './exam-kind-select.component.html',
  styleUrls: ['./exam-kind-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ExamKindSelectComponent),
    multi: true
  }]
})
export class ExamKindSelectComponent implements OnInit {
  // 默認顯示
  @Input() defaultShow: string;
  examKindArray$: Observable<Array<ExamKind>>;
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
  constructor(private examkindsvr: ExamKindService) { }

  ngOnInit() {
    this.examKindArray$ = this.examkindsvr.examKindList();
  }

}
