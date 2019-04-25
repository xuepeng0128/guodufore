import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest, concat, iif, merge, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {NzMessageService} from 'ng-zorro-antd';
import {isNullOrUndefined} from 'util';
import {MSG_DELETE_ERROR, MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';

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
  loginUser: LoginUser = this.usersvr.getUserStorage();
  constructor(private schoolsvr: SchoolService, private message: NzMessageService, private usersvr: UserService) { }

  ngOnInit() {
    this.schoolWinOrder$.subscribe(re => {
         if (re.nowState === 'add') {
            this.currentSchool = new School({ cityId: '0' , districtId : '0', saleManId: '0', train : false});
         } else if (re.nowState === 'edit') {
            this.currentSchool = re.school;
         }
         this.isSchoolModalShow = true;
         this.nowState = re.nowState;
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
