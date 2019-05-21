import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map} from 'rxjs/operators';
import {HabitTemplate} from '../../../entity/HabitTemplate';

import {HabitTemplateService} from '../../../shared/service/dic/habit-template.service';

@Component({
  selector: 'app-habit-template',
  templateUrl: './habit-template.component.html',
  styleUrls: ['./habit-template.component.css']
})
export class HabitTemplateComponent implements OnInit {
  habitTemplateWinOrder$: Subject<{nowState: string , habitTemplate: HabitTemplate}> = new Subject<{nowState: string , habitTemplate: HabitTemplate}>() ;
  user = this.usersvr.getUserStorage();
  habitTemplateArray: Array<HabitTemplate> = new Array<HabitTemplate>();
  pageBegin = 0;
  pageNo = 1;
  pageSize = 10;
  total = 0;
  constructor(private habittemplatesvr: HabitTemplateService, private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }

  onQuery = () => {
     this.habittemplatesvr.habitTemplateList(this.pageBegin, this.pageSize).subscribe(
      re => this.habitTemplateArray = re
    );
     this.habittemplatesvr.habitTemplateListTotal().subscribe(
        re => this.total = re
     );
  }

  onPageChange = (e) => {
    this.pageBegin = (e - 1) * this.pageSize;
    this.habittemplatesvr.habitTemplateList(this.pageBegin, this.pageSize).subscribe(
      re => this.habitTemplateArray = re
    );
  }
  onAdd = () => {
    this.habitTemplateWinOrder$.next({nowState: 'add', habitTemplate: null});
  }
  onEdit = (habitTemplate: HabitTemplate) => {
    this.habitTemplateWinOrder$.next({nowState: 'edit', habitTemplate});
  }
  onSaved = (nowState: string) => {
    this.pageBegin = 0;
    this.habittemplatesvr.habitTemplateList(this.pageBegin, this.pageSize).subscribe(
      re => this.habitTemplateArray = re
    );
    this.total += 1;
  }
  onDelete = (habitTemplate: HabitTemplate) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
         this.pageBegin = 0;
         this.habittemplatesvr.deleteHabitTemplate(habitTemplate.habitTemplateId).pipe(
          flatMap(re => this.habittemplatesvr.habitTemplateList(this.pageBegin, this.pageSize))
        ).subscribe(re => {
          this.habitTemplateArray = re;
          this.total -= 1;
        });
      }
    });
  }



  ondel = () => {
    this.habittemplatesvr.deleteHabitTemplate('ddfghhhj').subscribe(
      re => console.log(re)
    );
  }
}
