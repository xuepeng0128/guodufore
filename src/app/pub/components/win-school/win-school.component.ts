import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest, concat, iif, merge, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {NzMessageService} from 'ng-zorro-antd';
import {isNullOrUndefined} from 'util';
import {MSG_DELETE_ERROR, MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {BMapService} from "../../../shared/service/bmap.service";



@Component({
  selector: 'app-win-school',
  templateUrl: './win-school.component.html',
  styleUrls: ['./win-school.component.css']
})
export class WinSchoolComponent implements OnInit {

  constructor(private schoolsvr: SchoolService, private message: NzMessageService, private usersvr: UserService,
                private bmapsvr : BMapService
  ) { }
  @Input() schoolWinOrder$: Subject<{nowState: string , school: School}> = new Subject<{nowState: string , school: School}>() ;
  @Output() onSchoolSaved: EventEmitter<string> = new EventEmitter<string>();
  currentSchool: School = new School({});
  isSchoolModalShow = false;
  nowState = 'browse';
  loginUser: LoginUser = this.usersvr.getUserStorage();

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
    // ------------------------------  地标--------------------------------------//


  }


onSave = () => {
    // 验证
    this.message.remove();
    if (this.currentSchool.schoolName.length === 0 || isNullOrUndefined(this.currentSchool.schoolName)) {
      this.message.create('error', '请输入学校名称'); return;
    }
    if (this.currentSchool.districtId === '0') {
      this.message.create('error', '请选择学校所在区县'); return;
    }
    if (this.currentSchool.tel.length === 0 || isNullOrUndefined(this.currentSchool.tel)) {
    this.message.create('error', '请输入学校联系电话'); return;
    }
    if (this.currentSchool.linkMan.length === 0 || isNullOrUndefined(this.currentSchool.linkMan)) {
    this.message.create('error', '请输入学校联系人'); return;
  }
    if (this.currentSchool.address.length === 0 || isNullOrUndefined(this.currentSchool.address)) {
    this.message.create('error', '请输入学校地址'); return;
  }
    if (this.currentSchool.saleManId.length === 0 || isNullOrUndefined(this.currentSchool.saleManId)) {
    this.message.create('error', '请输入业务员'); return;
   }
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
