import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {combineLatest, iif, Subject} from 'rxjs';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

import {ISupUploadfiles} from '../../../shared/interface/ISupUploadfiles';
import {Circle} from "../../../entity/Circle";
import {CircleService} from "../../../shared/service/business/circle.service";
import {Icon} from "../../../entity/Icon";
import {UPLOAD_MEDIA_PATH} from "../../../shared/const";
import {UserService} from "../../../shared/user.service";
import {LoginUser} from "../../../entity/LoginUser";
import {ClassesService} from "../../../shared/service/basemsg/classes.service";
import {Classes} from "../../../entity/Classes";

@Component({
  selector: 'app-win-circle',
  templateUrl: './win-circle.component.html',
  styleUrls: ['./win-circle.component.css']
})
export class WinCircleComponent implements OnInit {
  @Input() circleWinOrder$: Subject<{nowState: string , circle: Circle,teacherTeachedClasses : Array<Classes>}>
           = new Subject<{nowState: string , circle: Circle,teacherTeachedClasses : Array<Classes>}>();
  @Output() onCircleSaved: EventEmitter<string> = new EventEmitter<string>();
  user: LoginUser = this.usersvr.getUserStorage();
  uploadMediaPath = UPLOAD_MEDIA_PATH;
  currentCircle: Circle = new Circle({});
  isCircleModalShow = false;
  nowState = 'browse';
 loading=false;

  teacherTeachedClasses: Array<Classes>= new Array<Classes>();
  constructor(private circlesvr: CircleService,
               private message: NzMessageService,private usersvr: UserService) { }

  ngOnInit() {

    this.circleWinOrder$.subscribe(re => {
      this.teacherTeachedClasses=re.teacherTeachedClasses;
      this.nowState =re.nowState;
      if (re.nowState === 'add') {
        this.currentCircle = new Circle({
          schoolId: this.user.school.schoolId,
          classesId: re.teacherTeachedClasses[0].classesId,
          buildTeacherId: this.user.teacher.teacherId
        });
      } else if (re.nowState === 'edit') {
        this.currentCircle = re.circle;
      }
      this.isCircleModalShow=true;
    });
  }

  onSave = () => {

    iif (  () => this.nowState === 'add' ,
        this.circlesvr.insertCircle(this.currentCircle),
        this.circlesvr.updateCircle(this.currentCircle)
    ).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onCircleSaved.emit(this.nowState);
          this.isCircleModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }




  handleChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.currentCircle.picUrl=info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }
}
