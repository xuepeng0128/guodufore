import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Circle} from '../../../entity/Circle';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../entity/User';
import {flatMap, map} from 'rxjs/operators';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CommonService} from '../../../shared/common.service';
import {LoginUser} from '../../../entity/LoginUser';
import {ICircleQueryParams} from "../../../shared/interface/queryparams/ICircleQueryParams";

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  constructor(private usersvr: UserService, private circlesvr: CircleService, private modalService: NzModalService,
              private message: NzMessageService, public commonsvr : CommonService) { }

  ngOnInit() {
  }


}
