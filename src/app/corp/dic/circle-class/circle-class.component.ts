import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UserService} from '../../../shared/user.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {iif} from 'rxjs';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {switchMap} from 'rxjs/operators';
import {CircleClass} from '../../../entity/CircleClass';
import {CircleClassService} from '../../../shared/service/dic/circle-class.service';

@Component({
  selector: 'app-circle-class',
  templateUrl: './circle-class.component.html',
  styleUrls: ['./circle-class.component.css']
})
export class CircleClassComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  isCircleClassModalShow = false;
  circleclassArray: Array<CircleClass> = new Array<CircleClass>();
  currentCircleClass: CircleClass = new CircleClass({});
  editState = 'browse';
  loading = false;
  constructor(private usersvr: UserService, private circleclasssvr: CircleClassService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.circleclasssvr.circleClassList().subscribe(re => {
      this.circleclassArray = re;
    });
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentCircleClass = new CircleClass({});
    this.isCircleClassModalShow = true;
  }
  onEdit = (circleClass: CircleClass) => {
    this.editState = 'edit';
    this.isCircleClassModalShow = true;
    this.currentCircleClass = circleClass;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
      this.circleclasssvr.insertCircleClass(this.currentCircleClass),
      this.circleclasssvr.updateCircleClass(this.currentCircleClass)
    ).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isCircleClassModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }

      }
    );
  }
  onDelete = (circleClass: CircleClass) => {

    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.circleclasssvr.deleteCircleClass(circleClass).pipe(
          switchMap(() => this.circleclasssvr.circleClassList())
        ).subscribe( re => {
          this.circleclassArray = re ;
        });
      }
    });

  }



  handleChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
          this.loading = true;
          break;
      case 'done':
          this.loading = false;
          this.currentCircleClass.icon = info.file.response.aliUrl;
          break;
      case 'error':
        this.message.error('网络错误');
        this.loading = false;
        break;
    }
  }


}
