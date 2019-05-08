import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {flatMap, map} from 'rxjs/operators';
import {HabitTemplate} from '../../../entity/HabitTemplate';
import {HabitService} from '../../../shared/service/basemsg/habit.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';

@Component({
  selector: 'app-habit-template',
  templateUrl: './habit-template.component.html',
  styleUrls: ['./habit-template.component.css']
})
export class HabitTemplateComponent implements OnInit {
  habitWinOrder$: Subject<{nowState: string , habit: HabitTemplate}> = new Subject<{nowState: string , habit: HabitTemplate}>() ;
  user = this.usersvr.getUserStorage();
  habitArray: Array<HabitTemplate> = new Array<HabitTemplate>();

  queryParams = {
    habitName : '',
    habitClass : ''
  };
  constructor(private habitsvr: HabitService, private usersvr: UserService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }

  onQuery = () => {
     this.habitsvr.habitTemplateList(this.queryParams).subscribe(
      re => this.habitArray = re
    );
  }


  onAdd = () => {
    this.habitWinOrder$.next({nowState: 'add', habit: null});
  }
  onEdit = (habit: HabitTemplate) => {
    this.habitWinOrder$.next({nowState: 'edit', habit});
  }
  onSaved = (habit: HabitTemplate) => {
    this.habitsvr.habitTemplateList(this.queryParams).subscribe(re =>
      this.habitArray = re
    );
  }
  onDelete = (habit: HabitTemplate) => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
         this.habitsvr.deleteTemplateHabit(habit).pipe(
          flatMap(re => this.habitsvr.habitTemplateList(this.queryParams))
        ).subscribe(re => this.habitArray = re );
      }
    });
  }
}
