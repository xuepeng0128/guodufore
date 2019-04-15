import { Component, OnInit } from '@angular/core';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {NzMessageService} from 'ng-zorro-antd';
import {combineLatest} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../entity/User';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-current-school',
  templateUrl: './current-school.component.html',
  styleUrls: ['./current-school.component.css']
})
export class CurrentSchoolComponent implements OnInit {
  currentSchool: School = (this.usersvr.getUserStorage() as User).manageSchool;

  constructor(private schoolsvr: SchoolService, private message: NzMessageService,
              private usersvr: UserService) {
  }

  ngOnInit() {
  }

  onSave = () => {
    // 补全school区，employee
    this.schoolsvr.updateSchool(this.currentSchool).subscribe( re => {
          if (re) {
            this.message.create('success', MSG_SAVE_SUCCESS);
          } else {
             this.message.create('error' , MSG_SAVE_ERROR);
          }
    });
  }
}
