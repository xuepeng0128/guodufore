import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {iif, Observable, of} from 'rxjs';
import {IClassQueryParams} from '../../../shared/interface/queryparams/IClassQueryParams';
import {IClassQueryResult} from '../../../shared/interface/queryparams/IClassQueryResult';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {CommonService} from '../../../shared/common.service';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';

@Component({
  selector: 'app-schoolclasses-select',
  templateUrl: './schoolclasses-select.component.html',
  styleUrls: ['./schoolclasses-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SchoolclassesSelectComponent),
    multi: true
  }]
})
export class SchoolclassesSelectComponent implements OnInit, OnChanges {
  @Input() schoolId: number;
  @Input() schoolYear: number;
  @Input() defaultShow: string;
  loginUser: LoginUser = this.usersvr.getUserStorage();
  private _CURRENTVALUE = '0'; // 区县选择 ngModel
  private onValueChangeCallBack: any = {};

  queryParams: IClassQueryParams = {
    schoolId : this.loginUser.school ?  this.loginUser.school.schoolId : '',
    grade: this.schoolYear ?  this.commonsvr.calculateGradeSchool(this.schoolYear) : null,
    pageSize : 1000,
    pageNo : 1,
    pageBegin : 0
  };
  // 班级列表
  public   classesArray$: Observable<Array<IClassQueryResult>> = of (new Array<IClassQueryResult>());

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
  constructor(private classessvr: ClassesService, private commonsvr: CommonService, private usersvr: UserService) { }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.queryParams.grade = this.commonsvr.calculateGradeSchool(this.schoolYear);
    if (this.schoolYear !== 0) {
      this.classesArray$ = this.classessvr.classesList(this.queryParams);
    } else {
      this.classesArray$ = of([]);
    }
    this._CURRENTVALUE = '0';
  }


}
