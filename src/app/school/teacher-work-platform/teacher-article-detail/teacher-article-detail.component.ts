import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UPLOAD_MEDIA_PATH} from '../../../shared/const';
import {UEditorComponent} from 'ngx-ueditor';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {TeacherArticle} from '../../../entity/TeacherArticle';
import {iif, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {TeacherArticleService} from '../../../shared/service/business/teacher-article.service';
declare  var UE: any;
@Component({
  selector: 'app-teacher-article-detail',
  templateUrl: './teacher-article-detail.component.html',
  styleUrls: ['./teacher-article-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherArticleDetailComponent implements OnInit {
  @ViewChild('full') full: UEditorComponent;
  isImgUpModalShow = false;
  iconUrl = '';
  loading = false;
  uploadMediaPath = UPLOAD_MEDIA_PATH;
  nowEdit = 'browse';
  constructor( public  teacherarticlesvr: TeacherArticleService, private message: NzMessageService,
               private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.nowEdit = this.route.snapshot.queryParams.nowEdit as string;
    setInterval(() => {
      this.cd.markForCheck();
    }, 1000);
  }

  onSave = () => {
    iif (() => this.nowEdit === 'add',
      this.teacherarticlesvr.insertTeacherArticle(this.teacherarticlesvr.currentArticle),
      this.teacherarticlesvr.updateTeacherArticle(this.teacherarticlesvr.currentArticle)
    ).subscribe(
      re => {
        if (re === 'ok') {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.router.navigate(['/frame/schoolteacherworkplatform/teacherarticle']);
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });

  }

onBack = () => {
     window.history.back();
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

  onchooseimg = () => {
    setTimeout(() => {
      this.iconUrl = '';

    }, 300);
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
