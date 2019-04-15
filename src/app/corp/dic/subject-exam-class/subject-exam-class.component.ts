import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/User';
import {StudySubject} from '../../../entity/StudySubject';
import {UserService} from '../../../shared/user.service';
import {StudySubjectService} from '../../../shared/service/dic/study-subject.service';
import {iif} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SubjectExamClass} from '../../../entity/SubjectExamClass';
import {SubjectExamClassService} from '../../../shared/service/dic/subject-exam-class.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-subject-exam-class',
  templateUrl: './subject-exam-class.component.html',
  styleUrls: ['./subject-exam-class.component.css']
})
export class SubjectExamClassComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  isSubjectExamClassModalShow = false;
  subjectExamClassArray: Array<SubjectExamClass> = new Array<SubjectExamClass>();
  currentSubjectExamClass: SubjectExamClass = new SubjectExamClass({studySubject : new StudySubject()});
  editState = 'browse';
  constructor(private usersvr: UserService,
              private subjectexamclasssvr: SubjectExamClassService,
              private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.subjectexamclasssvr.subjectExamClassList().subscribe(re => {
      this.subjectExamClassArray = re;
    });
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentSubjectExamClass = new SubjectExamClass({studySubject : new StudySubject()});
    this.isSubjectExamClassModalShow = true;
  }
  onEdit = (subjectExamClass: SubjectExamClass) => {
    this.currentSubjectExamClass = subjectExamClass;
    this.editState = 'edit';
    this.isSubjectExamClassModalShow = true;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
      this.subjectexamclasssvr.insertSubjectExamClass(this.currentSubjectExamClass),
      this.subjectexamclasssvr.updateSubjectExamClass(this.currentSubjectExamClass)
    ).subscribe(re => {
      if (re) {
        this.message.create('success', MSG_SAVE_SUCCESS);
        this.onQuery();

        this.isSubjectExamClassModalShow = false;
      } else {
        this.message.create('error', MSG_SAVE_ERROR);
      }
    }
   );
  }
  onDelete = (subjectExamClass: SubjectExamClass) => {

    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.subjectexamclasssvr.deleteSubjectExamClass(subjectExamClass).pipe(
          switchMap(() => this.subjectexamclasssvr.subjectExamClassList())
        ).subscribe( re => {
          this.subjectExamClassArray = re ;
        });
      }
    });



  }
}

