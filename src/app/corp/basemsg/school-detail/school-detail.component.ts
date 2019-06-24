import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SchoolService} from '../../../shared/service/basemsg/school.service';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../../../shared/user.service';
import {BMapService} from '../../../shared/service/bmap.service';
import {iif, Subject} from 'rxjs';
import {School} from '../../../entity/School';
import {LoginUser} from '../../../entity/LoginUser';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.css']
})
export class SchoolDetailComponent implements OnInit {
  constructor(private schoolsvr: SchoolService, private message: NzMessageService,
              private usersvr: UserService, private bmapsvr: BMapService,
              private route: ActivatedRoute
  ) { }
  currentSchool: School = new School({});
  nowState = 'browse';
  loginUser: LoginUser = this.usersvr.getUserStorage();
  ngOnInit() {
    this.nowState = this.route.snapshot.queryParams.nowState as string;
    setTimeout(() => {
      this.bmapsvr.initMap('baidumap');
      this.bmapsvr.onGetPos(this.onGetPOS);
    }, 1000);



    if ( this.nowState === 'add') {
        this.currentSchool = new School({ cityId: '0' , districtId : '0', saleManId: '0', train : false});
      } else if ( this.nowState === 'edit') {
        this.currentSchool = JSON.parse(this.route.snapshot.queryParams.school);
      }



    // ------------------------------  地标--------------------------------------//
    this.bmapsvr.onSetMapCenter('370000');

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
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }


 onGetPOS = (value: {lng: number, lat: number}) => {
      this.currentSchool.latitude = value.lat;
      this.currentSchool.longitude = value.lng;
 }
  onBack = () => {
    window.history.back();
  }


}
