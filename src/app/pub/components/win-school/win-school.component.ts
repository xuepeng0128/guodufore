import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest, concat, iif, merge, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {NzMessageService} from 'ng-zorro-antd';
import {isNullOrUndefined} from 'util';
import {MSG_DELETE_ERROR, MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {EmployeeService} from '../../../shared/service/system/employee.service';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-win-school',
  templateUrl: './win-school.component.html',
  styleUrls: ['./win-school.component.css']
})
export class WinSchoolComponent implements OnInit {
  @Input() schoolWinOrder$: Subject<{nowState: string , school: School}> = new Subject<{nowState: string , school: School}>() ;
  @Output() onSchoolSaved: EventEmitter<School> = new EventEmitter<School>();
  currentSchool: School = new School({});
  isSchoolModalShow = false;
  nowState = 'browse';
  constructor(private schoolsvr: SchoolService, private message: NzMessageService) { }

  ngOnInit() {
    this.schoolWinOrder$.subscribe(re => {
         if (re.nowState === 'add') {
            this.currentSchool = new School({});
         } else if (re.nowState === 'edit') {
            this.currentSchool = re.school;
         }
         this.isSchoolModalShow = true;
    });
  }

  onSave = () => {
              iif (() => this.nowState === 'add',
                this.schoolsvr.insertSchool(this.currentSchool),
                this.schoolsvr.updateSchool(this.currentSchool)
          ).subscribe(
               re => {
                       if (!isNullOrUndefined(re)) {
                         this.message.create('success', MSG_SAVE_SUCCESS);
                         this.onSchoolSaved.emit(re);
                         this.isSchoolModalShow = false;
                       } else {
                         this.message.create('error', MSG_SAVE_ERROR);
                       }
               });
  }
}
