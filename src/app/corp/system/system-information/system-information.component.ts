import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {SystemInformation} from '../../../entity/SystemInformation';
import {SystemInformationService} from '../../../shared/service/system/system-information.service';

@Component({
  selector: 'app-system-information',
  templateUrl: './system-information.component.html',
  styleUrls: ['./system-information.component.css']
})
export class SystemInformationComponent implements OnInit {
  informationList: Array<SystemInformation> = new Array<SystemInformation>();
  total = 0;
  queryParams: any = {
    pageSize : 10,
    pageNo : 1,
    pageBegin : 0
  };
  isInformationModalShow = false;
  currentInformation: SystemInformation = new SystemInformation();

  constructor(private inforsvr: SystemInformationService, private message: NzMessageService) { }

  ngOnInit() {
     this.onQuery();
  }

onQuery = () => {
    this.queryParams.pageNo = 1;
    this.queryParams.pageSize = 10;
    this.inforsvr.sysInformationList(this.queryParams).subscribe(
    re => this.informationList = re
  );
    this.inforsvr.sysInformationListTotal().subscribe(
    re => this.total = re
  );
}

  onPageChange = () => {
    this.queryParams.pageBegin = (this.queryParams.pageNo - 1) * this.queryParams.pageSize;
    this.inforsvr.sysInformationList(this.queryParams).subscribe(
      re => this.informationList = re
    );
  }

  onAdd = () => {
    this.currentInformation = new SystemInformation();
    this.isInformationModalShow = true;
  }
  onSend = () => {
    this.inforsvr.insertInformation(this.currentInformation).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isInformationModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      }
    );
  }




}
