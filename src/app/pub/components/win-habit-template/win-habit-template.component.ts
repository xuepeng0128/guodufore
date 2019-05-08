import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Subject} from 'rxjs';
import {HabitTemplate} from '../../../entity/HabitTemplate';
import {HabitService} from '../../../shared/service/basemsg/habit.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ISupUploadfiles} from '../../../shared/interface/ISupUploadfiles';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-win-habit-template',
  templateUrl: './win-habit-template.component.html',
  styleUrls: ['./win-habit-template.component.css']
})
export class WinHabitTemplateComponent implements OnInit {
  @Input() habitTemplateWinOrder$: Subject<{nowState: string , habitTemplate: HabitTemplate}> = new Subject<{nowState: string , habitTemplate: HabitTemplate}>();
  @Output() onHabitSaved: EventEmitter<string> = new EventEmitter<string>();

  uploadFilePath = '';


  currentHabitTemplate: HabitTemplate = new HabitTemplate({});
  isHabitModalShow = false;
  nowState = 'browse';

  picFileList = [];
  videoFileList = [];
  audioFileList = [];

  previewImage = '';
  previewVideo = '';
  previewAudio = '';

  previewImgVisible = false;
  previewVideoVisible = false;
  previewAudioVisible = false;

  constructor(private habitsvr: HabitService, private message: NzMessageService) { }


  handleImgPreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewImgVisible = true;
    //  this.currentHabit.picUrl = this.previewImage;
  }

  handleVideoPreview = (file: ISupUploadfiles) => {
    this.previewVideo = file.url || file.thumbUrl ||  file.base64Data;
    this.previewVideoVisible = true;
    //   this.currentHabit.videoUrl = this.previewVideo;
  }

  handleAudioPreview = (file: ISupUploadfiles) => {
    this.previewAudio = file.url || file.thumbUrl ||  file.base64Data;
    this.previewAudioVisible = true;
    // this.currentHabit.audioUrl = this.previewAudio;
  }



  ngOnInit() {
    this.habitWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        this.currentHabit = new HabitTemplate({});
      } else if (re.nowState === 'edit') {
        this.currentHabit = re.habit;
      }
      this.isHabitModalShow = true;
    });
  }

  onSave = () => {

    iif (  () => this.nowState === 'add' ,
      this.habitsvr.insertTemplateHabit(this.currentHabit),
      this.habitsvr.updateTemplateHabit(this.currentHabit)
    ).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onHabitSaved.emit(re);
          this.isHabitModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
}
