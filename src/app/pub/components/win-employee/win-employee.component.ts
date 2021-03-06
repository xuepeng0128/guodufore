import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest, iif, Subject} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {Employee} from '../../../entity/Employee';
import {CorpDuty} from '../../../entity/CorpDuty';

@Component({
  selector: 'app-win-employee',
  templateUrl: './win-employee.component.html',
  styleUrls: ['./win-employee.component.css']
})
export class WinEmployeeComponent implements OnInit {
  @Input() employeeWinOrder$: Subject<{nowState: string , employee: Employee}> ;
  @Output() onEmployeeSaved: EventEmitter<Employee> = new EventEmitter<Employee>();
  currentEmployee: Employee = new Employee({duty : new CorpDuty({})});
  isEmployeeModalShow = false;
  nowState = 'browse';
  constructor( private message: NzMessageService,
               private emloyeesvr: EmployeeService) { }

  ngOnInit() {
    this.employeeWinOrder$.subscribe(re => {
      if (re.nowState === 'add') {
        this.currentEmployee = new Employee({duty : new CorpDuty({})});
      } else if (re.nowState === 'edit') {
        this.currentEmployee = re.employee;
      }
      this.isEmployeeModalShow = true;
    });
  }

  onSave = () => {
    // 补全school区，employee

          iif (() => this.nowState === 'add',
                          this.emloyeesvr.insertEmployee(this.currentEmployee),
                          this.emloyeesvr.updateEmployee(this.currentEmployee)
          ).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onEmployeeSaved.emit(re);
          this.isEmployeeModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
}
