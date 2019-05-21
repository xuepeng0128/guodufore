import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Subject} from 'rxjs';
import {Habit} from '../../../entity/Habit';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ISupUploadfiles} from '../../../shared/interface/ISupUploadfiles';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {HabitService} from '../../../shared/service/business/habit.service';
import {HabitExam} from '../../../entity/HabitExam';

@Component({
  selector: 'app-win-no-exam-habit',
  templateUrl: './win-no-exam-habit.component.html',
  styleUrls: ['./win-no-exam-habit.component.css']
})
export class WinNoExamHabitComponent implements OnInit {
  @Input() noExamHabitWinOrder$: Subject<{nowState: string , habit: Habit, circleId: string}> =
    new Subject<{nowState: string , habit: Habit, circleId: string}>();
  @Output() onNoExamHabitSaved: EventEmitter<string> = new EventEmitter<string>();
  iconWinOrder$: Subject<string> = new Subject<string>();
  currentHabit: Habit = new Habit({});
  isNoExamHabitModalShow = false;
  nowState = 'browse';
  studentIds: Array<string> = new Array<string>();
  limitTime = new Date('2001-01-01 00:30:00');
  constructor(private habitsvr: HabitService, private message: NzMessageService) { }




  ngOnInit() {
    this.noExamHabitWinOrder$.subscribe(re => {
      this.nowState = re.nowState;
      if (re.nowState === 'add') {
        this.currentHabit = new Habit({
          circleId : re.circleId
        });
      } else if (re.nowState === 'edit') {
        this.currentHabit = re.habit;
      }
      this.isNoExamHabitModalShow = true;
    });
  }

  onSave = () => {
   const hlist: Array<Habit> = new Array<Habit>();
   hlist.push(this.currentHabit);
   this.habitsvr.insertExamHabit({ habitExam: null, habits: hlist, studentIds: this.studentIds}).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onNoExamHabitSaved.emit('');
          this.isNoExamHabitModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }


  showIconChoose = () => {
    this.iconWinOrder$.next('open');
  }
  iconHavechoosed = (iconUrl: string) => {
    this.currentHabit.icon = iconUrl;
  }
}
