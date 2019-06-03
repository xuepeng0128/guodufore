import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {CorpDuty} from '../../../entity/CorpDuty';
import {UserService} from '../../../shared/user.service';
import {CorpdutyService} from '../../../shared/service/dic/corpduty.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {iif} from 'rxjs';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {switchMap} from 'rxjs/operators';
import {HabitClass} from '../../../entity/HabitClass';
import {HabitClassService} from '../../../shared/service/dic/habit-class.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-habit-class',
  templateUrl: './habit-class.component.html',
  styleUrls: ['./habit-class.component.css']
})
export class HabitClassComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  isHabitClassModalShow = false;
  habitclassArray: Array<HabitClass> = new Array<HabitClass>();
  currentHabitClass: HabitClass = new HabitClass({});
  editState = 'browse';
  constructor(private usersvr: UserService, private habitclasssvr: HabitClassService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.habitclasssvr.habitClassList().subscribe(re => {
      this.habitclassArray = re;
    });
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentHabitClass = new HabitClass({});
    this.isHabitClassModalShow = true;
  }
  onEdit = (habitClass: HabitClass) => {
    this.currentHabitClass = habitClass;
    this.editState = 'edit';
    this.isHabitClassModalShow = true;
  }
  onSave = () => {
    // 验证
    this.message.remove();
    if (this.currentHabitClass.habitClassName.length === 0 || isNullOrUndefined(this.currentHabitClass.habitClassName)) {
      this.message.create('error', '请输入类别名称'); return;
    }
    if (this.currentHabitClass.pareHabitClassId === '0') {
      this.message.create('error', '请选择上级类别'); return;
    }
    iif(
      () => this.editState === 'add',
      this.habitclasssvr.insertHabitClass(this.currentHabitClass),
      this.habitclasssvr.updateHabitClass(this.currentHabitClass)
    ).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isHabitClassModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }

      }
    );
  }
  onDelete = (habitClass: HabitClass) => {

    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.habitclasssvr.deleteHabitClass(habitClass).pipe(
          switchMap(() => this.habitclasssvr.habitClassList())
        ).subscribe( re => {
          this.habitclassArray = re ;
        });
      }
    });

  }

}
