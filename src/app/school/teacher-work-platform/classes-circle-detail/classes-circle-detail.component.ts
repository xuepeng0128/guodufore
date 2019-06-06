import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {UPLOAD_MEDIA_PATH} from '../../../shared/const';
import {Circle} from '../../../entity/Circle';
import {Classes} from '../../../entity/Classes';
import {CircleService} from '../../../shared/service/business/circle.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {UserService} from '../../../shared/user.service';
import {iif} from 'rxjs';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {UEditorComponent} from 'ngx-ueditor';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
declare var UE: any;
@Component({
  selector: 'app-classes-circle-detail',
  templateUrl: './classes-circle-detail.component.html',
  styleUrls: ['./classes-circle-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesCircleDetailComponent implements OnInit {
  @ViewChild('full') full: UEditorComponent;
  user: LoginUser = this.usersvr.getUserStorage();
  uploadMediaPath = UPLOAD_MEDIA_PATH;
  nowState = 'browse';
  loading = false;
  isImgUpModalShow = false;
  teacherTeachedClasses: Array<Classes> = new Array<Classes>();
  iconUrl = '';
  constructor(public circlesvr: CircleService, private message: NzMessageService, private usersvr: UserService,
              private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private classessvr: ClassesService ) {
  }

  ngOnInit() {
    this.nowState = this.route.snapshot.queryParams.nowEdit as string;
    setInterval(() => {
      this.cd.markForCheck();
    }, 1000);
    this.classessvr.teacherTeachedClasses(this.user.teacher.teacherId, this.user.school.schoolId, this.user.school.schoolStyle).subscribe(
      re => {
        this.teacherTeachedClasses = re;
        if ( this.circlesvr.currentCircle.classesId === '') {
         this.circlesvr.currentCircle.classesId = this.teacherTeachedClasses[0].classesId;
       }
      }
    );
  }

  onSave = () => {
    if (this.nowState === 'add') {
      this.circlesvr.currentCircle.circleId = this.circlesvr.makeCircleId();

    }
    iif(() => this.nowState === 'add',
      this.circlesvr.insertCircle(this.circlesvr.currentCircle),
      this.circlesvr.updateCircle(this.circlesvr.currentCircle)
    ).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onBack();
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }

  onBack = () => {
    window.history.back();
  }

  handlePicChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.circlesvr.currentCircle.picUrl = info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }


  onPreReady = (comp: UEditorComponent) => {
    UE.registerUI('button', (editor, uiName) => {
      // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
      editor.registerCommand(uiName, {
        execCommand() {
          // alert('execCommand:' + uiName);
          //  this.isImgUpModalShow = true;
        }
      });
      // 创建一个button
      const btn = new UE.ui.Button({
        // 按钮的名字
        name: uiName,
        // 提示
        title: '上传图片',
        // 添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -726px -77px;',
        // 点击时执行的命令
        onclick : () => {
          // 这里可以不用执行命令,做你自己的操作也可
          this.isImgUpModalShow = !this.isImgUpModalShow;
        }
      });
      // 当点到编辑内容上时，按钮要做的状态反射
      editor.addListener('selectionchange', () => {
        const state = editor.queryCommandState(uiName);
        if (state === -1) {
          btn.setDisabled(true);
          btn.setChecked(false);
        } else {
          btn.setDisabled(false);
          btn.setChecked(state);
        }
      });
      // 因为你是添加button,所以需要返回这个button
      return btn;
    }, 5, comp.id);
    // comp.id 是指当前UEditor实例Id
  }

  handleChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.iconUrl = info.file.response.aliUrl;
        this.loading = false;
        this.isImgUpModalShow = false;
        this.full.Instance.execCommand('inserthtml', `<img src="${this.iconUrl}" />`);
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }
}
