import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../entity/Employee';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.css'],
  providers: [{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmployeeSelectComponent),
  multi: true
}]
})
export class EmployeeSelectComponent implements OnInit {
  // 默認顯示
  @Input() defaultShow: string;
  // 当选择的值发生变化，激发事件
  @Output() onValueChanged: EventEmitter<any> = new EventEmitter<any>();
  employeeArray$: Observable<Array<Employee>>;
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
  constructor(private employeesvr: EmployeeService) { }

  ngOnInit() {
     this.employeeArray$ = this.employeesvr.employeeList({pageSize : 1000, pageNo: 1, getTotal : '0'}).pipe(
       map(re => [new Employee({paperId : '0', employeeName : this.defaultShow})].concat(re.list))
     );
  }
  onValueSelected = () => {
    this.onValueChanged.emit(this._CURRENTVALUE);
  }
}
