import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../entity/User';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-teacher-choose',
  templateUrl: './teacher-choose.component.html',
  styleUrls: ['./teacher-choose.component.css']
})
export class TeacherChooseComponent implements OnInit {
  user: User = this.usersvr.getUserStorage();
  @Input() teacherChooseSign$: Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>
  = new Subject<{ singleChoose: boolean, haveChoosedTeacher: Array<Teacher>}>();

  @Output() onTeacherChoosed: EventEmitter<Teacher|Array<Teacher>> = new EventEmitter<Teacher | Array<Teacher>>();
    singleChoose = true;
  isTeacherChooseModalShow = false;
  teacherList: Array<MultiChooseTeacher> = new Array<MultiChooseTeacher>() ;
  total = 0;
  entFilter = '';
  queryParams = {
    schoolId : this.user.manageSchool.schoolId,
     pageSize : 1000,
     pageNo : 1,
    getTotal : '0'
  };
  constructor(private teachersvr: TeacherService, private usersvr: UserService) { }

  ngOnInit() {
    this.onQuery();
    this.teacherChooseSign$.subscribe(re => {
      this.isTeacherChooseModalShow = true;
      this.singleChoose = re.singleChoose;
      if (!this.singleChoose) {
         re.haveChoosedTeacher.forEach(t => {
           this.teacherList.filter(o => o.paperId === t.paperId)[0].choosed = true;
         });
      }
    });
  }

  onQuery = () => {
     this.teachersvr.teacherList(this.queryParams).pipe(
      map(re => {
        return re.list as Array<MultiChooseTeacher>;
      })
    ).subscribe( re => this.teacherList = re);
  }

  onSingleChoose = (teacher: MultiChooseTeacher) => {
     this.onTeacherChoosed.emit(teacher as Teacher);
     this.isTeacherChooseModalShow = false;
  }

onMulChoose = () => {
    this.onTeacherChoosed.emit(this.teacherList.filter(o => o.choosed));
    this.isTeacherChooseModalShow = false;
}


}

export class MultiChooseTeacher extends Teacher {
       choosed: boolean;

  constructor(choosed?: boolean) {
    super({});
    this.choosed = choosed || false;
  }
}
