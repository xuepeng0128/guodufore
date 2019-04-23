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
import {CommonService} from '../../../shared/common.service';
import {IClassQueryResult} from '../../../shared/interface/queryparams/IClassQueryResult';
import {ClassesStudent} from '../../../entity/ClassesStudent';
import {ClassesTeacher} from '../../../entity/ClassesTeacher';

@Component({
  selector: 'app-win-classes',
  templateUrl: './win-classes.component.html',
  styleUrls: ['./win-classes.component.css']
})
export class WinClassesComponent implements OnInit {
  @Input() classesWinOrder$: Subject<{nowState: string , classesId: string}> ;
  @Input() showDetail: boolean;
  @Output() onClassesSaved: EventEmitter<Classes> = new EventEmitter<Classes>();


  teacherChooseSign$: Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>
    = new Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>();
  templateFilePath = DOWNLOAD_TEMPLATE_PATH + '/studentTemplate.xls';
  currentClasses: Classes = new Classes({});
  isClassesModalShow = false;
  nowState = 'browse';
  toChooseTeacher = 'headMaster';
  constructor(private classessvr: ClassesService, private message: NzMessageService, public commonsvr: CommonService) { }


  ngOnInit() {
    this.classesWinOrder$.subscribe(re => {
      if (re.nowState === 'add') {
        this.currentClasses = new Classes({});
      } else if (re.nowState === 'edit') {
        this.classessvr.classesList({classesId : re.classesId , pageBegin : 0 , pageSize : 1 , pageNo: 1}).subscribe(
          (re: Array<IClassQueryResult>) => this.currentClasses =
            new Classes({classesId: re[0].classesId, grade : re[0].grade,
                                     classes: re[0].classes, classesName: re[0].classesName,
                                  headMaster: re[0].headMaster, headMasterName: re[0].headMasterName,
                                    schoolId: re[0].schoolId , schoolName : re[0].schoolName,
                                     regTime: null, endTime: null, students: null, teachers: null
            })
        );

      }
      this.isClassesModalShow = true;
    });
  }


  onRemoveTeacher = (t: ClassesTeacher) => {
   this.currentClasses.teachers = this.currentClasses.teachers.filter(o => o.teacherPaperId !== t.teacherPaperId);
  }
  onTeacherChoosed = (t: ClassesTeacher | Array<ClassesTeacher>) => {
     if (this.toChooseTeacher === 'headMaster') {
       this.currentClasses.headMaster = (t as ClassesTeacher).teacherPaperId;
       this.currentClasses.headMasterName = (t as ClassesTeacher).teacherName;
     } else {
            this.currentClasses.teachers = new Array<ClassesTeacher> ();
            (t as Array<ClassesTeacher>).forEach( (v, k) => {
             this.currentClasses.teachers.push(v);
           });
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
