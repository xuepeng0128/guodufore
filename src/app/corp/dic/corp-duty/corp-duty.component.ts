import { Component, OnInit } from '@angular/core';
import { CorpDuty } from 'src/app/entity/CorpDuty';
import { UserService } from 'src/app/shared/user.service';
import { CorpdutyService } from 'src/app/shared/service/dic/corpduty.service';
import {iif} from 'rxjs/internal/observable/iif';
import {User} from '../../../entity/User';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-corp-duty',
  templateUrl: './corp-duty.component.html',
  styleUrls: ['./corp-duty.component.css']
})
export class CorpDutyComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  isCorpDutyModalShow = false;
  corpdutyArray: Array<CorpDuty> = new Array<CorpDuty>();
  currentCorpDuty: CorpDuty = new CorpDuty({});
  editState = 'browse';
  constructor(private usersvr: UserService, private corpdutysvr: CorpdutyService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
      this.corpdutysvr.corpDutyList().subscribe(re => {
        this.corpdutyArray = re;
     });
  }
  onAdd = () => {
     this.editState = 'add';
     this.currentCorpDuty = new CorpDuty({});
     this.isCorpDutyModalShow = true;
  }
  onEdit = (corpDuty: CorpDuty) => {
    this.currentCorpDuty = corpDuty;
    this.editState = 'edit';
    this.isCorpDutyModalShow = true;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
          this.corpdutysvr.insertCorpDuty(this.currentCorpDuty),
          this.corpdutysvr.updateCorpDuty(this.currentCorpDuty)
    ).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isCorpDutyModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }

      }
    );
  }
  onDelete = (corpDuty: CorpDuty) => {

    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.corpdutysvr.deleteCorpDuty(corpDuty).pipe(
          switchMap(() => this.corpdutysvr.corpDutyList())
        ).subscribe( re => {
          this.corpdutyArray = re ;
        });
      }
    });

  }
}
