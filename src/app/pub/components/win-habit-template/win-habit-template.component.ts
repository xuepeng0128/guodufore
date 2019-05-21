import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Subject} from 'rxjs';
import {HabitTemplate} from '../../../entity/HabitTemplate';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ISupUploadfiles} from '../../../shared/interface/ISupUploadfiles';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {HabitTemplateService} from '../../../shared/service/dic/habit-template.service';

@Component({
  selector: 'app-win-habit-template',
  templateUrl: './win-habit-template.component.html',
  styleUrls: ['./win-habit-template.component.css']
})
export class WinHabitTemplateComponent implements OnInit {
  iconWinOrder$: Subject<string> = new Subject<string>();
  @Input() habitTemplateWinOrder$: Subject<{nowState: string , habitTemplate: HabitTemplate}>
    = new Subject<{nowState: string , habitTemplate: HabitTemplate}>() ;

  @Output() onHabitTemplateSaved: EventEmitter<string> = new EventEmitter<string>();

  uploadFilePath = '';


  currentHabitTemplate: HabitTemplate = new HabitTemplate({});
  isHabitTemplateModalShow = false;
  nowState = 'browse';

  limitTime = new Date('2001-01-01 00:30:00');
  constructor(private habittemplatesvr: HabitTemplateService, private message: NzMessageService) { }

  ngOnInit() {
    this.habitTemplateWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        this.currentHabitTemplate = new HabitTemplate({});
      } else if (re.nowState === 'edit') {
        this.currentHabitTemplate = re.habitTemplate;
      }
      this.isHabitTemplateModalShow = true;
    });
  }

  onSave = () => {

    iif (  () => this.nowState === 'add' ,
      this.habittemplatesvr.insertHabitTemplate(this.currentHabitTemplate),
      this.habittemplatesvr.updateHabitTemplate(this.currentHabitTemplate)
    ).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onHabitTemplateSaved.emit(this.nowState);
          this.isHabitTemplateModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }


  showIconChoose = () => {
      this.iconWinOrder$.next('open');
  }
  iconHavechoosed = (iconUrl: string) => {
    this.currentHabitTemplate.icon = iconUrl;
  }
}
