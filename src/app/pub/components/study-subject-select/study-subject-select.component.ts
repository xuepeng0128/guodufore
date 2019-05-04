import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {StudySubject} from '../../../entity/StudySubject';
import {StudySubjectService} from '../../../shared/service/dic/study-subject.service';
import {map} from "rxjs/operators";
import {School} from "../../../entity/School";

@Component({
  selector: 'app-study-subject-select',
  templateUrl: './study-subject-select.component.html',
  styleUrls: ['./study-subject-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StudySubjectSelectComponent),
    multi: true
  }]
})
export class StudySubjectSelectComponent implements OnInit {
// 默認顯示
  @Input() defaultShow: string;
  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();
  studySubjectArray$: Observable<Array<StudySubject>>;
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
  constructor(private studysubjectsvr: StudySubjectService) { }

  ngOnInit() {
    this.studySubjectArray$ = this.studysubjectsvr.studySubjectList().pipe(
      map(re => [ new StudySubject({studySubjectId : '0', studySubjectName: this.defaultShow})].concat(
        re.map( m => new StudySubject({studySubjectId : m.studySubjectId ,studySubjectName : m.studySubjectName}))
      )
      )
   );
  }
  onValueSelected = () => {
    this.onValueChanged.emit(this._CURRENTVALUE);
  }
}
