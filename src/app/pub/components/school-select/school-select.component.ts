import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {map} from 'rxjs/operators';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {ISchoolQueryParams} from '../../../shared/interface/queryparams/ISchoolQueryParams';

@Component({
  selector: 'app-school-select',
  templateUrl: './school-select.component.html',
  styleUrls: ['./school-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SchoolSelectComponent),
    multi: true
  }]
})
export class SchoolSelectComponent implements OnInit {
  // 默認顯示
  @Input() defaultShow: string;
  schoolArray$: Observable<Array<School>>;
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
  constructor(private schoolsvr: SchoolService) { }

  ngOnInit() {
    const queryParams: ISchoolQueryParams = {
      pageSize : 1000,
      pageBegin: 0
    };
    this.schoolArray$ = this.schoolsvr.schoolList(queryParams).pipe(
      map(re => [ new School({schoolId : '0', schoolName: this.defaultShow})].concat( 
             re.map( m => new School({schoolId : m.schoolId ,schoolName : m.schoolName}))
          )
      )
    );
  }

}
