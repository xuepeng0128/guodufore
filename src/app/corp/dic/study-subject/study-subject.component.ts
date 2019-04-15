import { Component, OnInit } from '@angular/core';
import {User} from '../../../entity/User';
import {StudySubject} from '../../../entity/StudySubject';
import {UserService} from '../../../shared/user.service';
import {iif} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {StudySubjectService} from '../../../shared/service/dic/study-subject.service';
import {ClassesService} from '../../../shared/service/basemsg/classes.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MSG_SAVE_ERROR, MSG_SAVE_SUCCESS} from '../../../shared/SysMessage';

@Component({
  selector: 'app-study-subject',
  templateUrl: './study-subject.component.html',
  styleUrls: ['./study-subject.component.css']
})
export class StudySubjectComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  isStudySubjectModalShow = false;
  studySubjectArray: Array<StudySubject> = new Array<StudySubject>();
  currentStudySubject: StudySubject = new StudySubject();
  editState = 'browse';
  constructor(private usersvr: UserService, private studysubjectsvr: StudySubjectService,
              private modalService: NzModalService,private message: NzMessageService) { }

  ngOnInit() {
    this.onQuery();
  }
  onQuery = () => {
    this.studysubjectsvr.studySubjectList().subscribe(re => {
      this.studySubjectArray = re;
    });
  }
  onAdd = () => {
    this.editState = 'add';
    this.currentStudySubject = new StudySubject();
    this.isStudySubjectModalShow = true;
  }
  onEdit = (studySubject: StudySubject) => {
    this.currentStudySubject = studySubject;
    this.editState = 'edit';
    this.isStudySubjectModalShow = true;
  }
  onSave = () => {
    iif(
      () => this.editState === 'add',
      this.studysubjectsvr.insertStudySubject(this.currentStudySubject),
      this.studysubjectsvr.updateStudySubject(this.currentStudySubject)
    ).subscribe(re => {
        if (re) {
          this.message.create('success', MSG_SAVE_SUCCESS);
          this.onQuery();
          this.isStudySubjectModalShow = false;
        } else {
          this.message.create('error', MSG_SAVE_ERROR);
        }

      }

    );
  }
  onDelete = (studySubject: StudySubject) => {

    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>确定删除该数据吗?</b>',
      nzOnOk: () => {
        this.studysubjectsvr.deleteStudySubject(studySubject).pipe(
          switchMap(() => this.studysubjectsvr.studySubjectList())
        ).subscribe( re => {
          this.studySubjectArray = re ;
        });
      }
    });




  }
}
