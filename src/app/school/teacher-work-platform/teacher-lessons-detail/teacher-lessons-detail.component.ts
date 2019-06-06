import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {TeacherLessonService} from '../../../shared/service/business/teacher-lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {UEditorComponent} from 'ngx-ueditor';
import {UPLOAD_MEDIA_PATH} from '../../../shared/const';
import {SubTeacherLesson} from '../../../entity/SubTeacherLesson';
import {isNullOrUndefined} from 'util';
declare  var UE: any;
@Component({
  selector: 'app-teacher-lessons-detail',
  templateUrl: './teacher-lessons-detail.component.html',
  styleUrls: ['./teacher-lessons-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherLessonsDetailComponent implements OnInit {
  @ViewChild('full') full: UEditorComponent;
  isImgUpModalShow = false;
  iconUrl = '';
  loading = false;
  uploadMediaPath = UPLOAD_MEDIA_PATH;
  nowEdit = 'browse';
  editingLesson: SubTeacherLesson = new SubTeacherLesson({
   });
  constructor(public  teacherlessonsvr: TeacherLessonService, private modalService: NzModalService,
              private cd: ChangeDetectorRef, private message: NzMessageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (isNullOrUndefined(this.teacherlessonsvr.currentSubLessonArray) || this.teacherlessonsvr.currentSubLessonArray.length === 0) {
      this.router.navigate(['/frame/schoolteacherworkplatform/teacherlessons']);
    } else {
      this.nowEdit = this.route.snapshot.queryParams.nowEdit as string;
      if (this.nowEdit === 'add') {
        this.teacherlessonsvr.currentSubLessonArray.length=0;
        this.addNewLesson();
      } else {
        this.editingLesson = this.teacherlessonsvr.currentSubLessonArray[0];
      }

      setInterval(() => {
        this.cd.markForCheck();
      }, 1000);
    }

  }
  addNewLesson = () => {
    this.editingLesson = new SubTeacherLesson({
       lessonId : this.teacherlessonsvr.currentLesson.lessonId,
       lessonNo : this.teacherlessonsvr.currentSubLessonArray.length + 1,
       videoUrl : ''
    });
    this.teacherlessonsvr.currentSubLessonArray.push(this.editingLesson);
  }
  chooseLesson = (lesson: SubTeacherLesson) => {
     this.editingLesson = lesson;
  }
  removeLesson = () => {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该课时吗?</b>',
      nzOnOk: () => {
        this.teacherlessonsvr.currentSubLessonArray = this.teacherlessonsvr.currentSubLessonArray.filter(o => o.lessonNo !== this.editingLesson.lessonNo);
        this.teacherlessonsvr.currentSubLessonArray.forEach((v, k) => v.lessonNo = k + 1);
        if (this.teacherlessonsvr.currentSubLessonArray.length === 0) {
          this.addNewLesson();
        } else {
          this.editingLesson = this.teacherlessonsvr.currentSubLessonArray[0];
        }

      }
    });
  }






  onSave = () => {

      this.teacherlessonsvr.saveTeacherLesson({
                          teacherLesson: this.teacherlessonsvr.currentLesson,
                          subTeacherLessons: this.teacherlessonsvr.currentSubLessonArray}
                          )
     .subscribe(
      re => {
        if (re === 'ok') {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.router.navigate(['/frame/schoolteacherworkplatform/teacherlessons']);
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




  handlevideoChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.editingLesson.videoUrl = info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }
  handleaudioChange = (info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.editingLesson.audioUrl = info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }



  handlepicUrlChange=(info: { file: UploadFile }) => {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.teacherlessonsvr.currentLesson.picUrl = info.file.response.aliUrl;
        this.loading = false;
        break;
      case 'error':
        this.message.error('网络错误');
        break;
    }
  }



}
