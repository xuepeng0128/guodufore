import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {iif, Subject} from 'rxjs';
import {Habit} from '../../../entity/Habit';
import {HabitService} from '../../../shared/service/basemsg/habit.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {ISupUploadfiles} from '../../../shared/interface/ISupUploadfiles';
import {isNullOrUndefined} from 'util';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';
import {Classes} from '../../../entity/Classes';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {Teacher} from '../../../entity/Teacher';
import {DOWNLOAD_TEMPLATE_PATH} from '../../../shared/const';

@Component({
  selector: 'app-win-classes',
  templateUrl: './win-classes.component.html',
  styleUrls: ['./win-classes.component.css']
})
export class WinClassesComponent implements OnInit {
  @Input() classesWinOrder$: Subject<{nowState: string , classes: Classes}> ;
  @Output() onClassesSaved: EventEmitter<Classes> = new EventEmitter<Classes>();

  teacherChooseSign$: Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>
    = new Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>();
  templateFilePath = DOWNLOAD_TEMPLATE_PATH + '/studentTemplate.xls';
  currentClasses: Classes = new Classes({});
  isClassesModalShow = false;
  nowState = 'browse';
  constructor(private classessvr: ClassesService, private message: NzMessageService) { }


  ngOnInit() {
    this.classesWinOrder$.subscribe(re => {
      if (re.nowState === 'add') {
        this.currentClasses = new Classes({});
      } else if (re.nowState === 'edit') {
        this.currentClasses = re.classes;
      }
      this.isClassesModalShow = true;
    });
  }


  onRemoveAssTeacher = (t: Teacher) => {
   this.currentClasses.assTeachers = this.currentClasses.assTeachers.filter(o => o.paperId !== t.paperId);
  }
  onTeacherChoosed = (t: Teacher | Array<Teacher>) => {
     if (t instanceof Array ) { // 代课老师
          this.currentClasses.assTeachers = t;
     } else {
         this.currentClasses.headmaster = t;
     }
  }

 handleDataChange = (info: { file: UploadFile, fileList: Array<any> }) => {
  if (info.fileList.length === 0) {

    } else {
      console.log(info);
    }
}
  onSave = () => {
    iif (  () => this.nowState === 'add' ,
      this.classessvr.insertClasses(this.currentClasses),
      this.classessvr.updateClasses(this.currentClasses)
    ).subscribe(
      re => {
        if (!isNullOrUndefined(re)) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onClassesSaved.emit(re);
          this.isClassesModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }
      });
  }
}
