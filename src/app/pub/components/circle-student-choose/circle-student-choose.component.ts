import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {Subject} from 'rxjs';
import {Teacher} from '../../../entity/Teacher';
import {TeacherService} from '../../../shared/service/basemsg/teacher.service';
import {UserService} from '../../../shared/user.service';
import {map} from 'rxjs/operators';
import {Student} from '../../../entity/Student';
import {CircleService} from '../../../shared/service/business/circle.service';
import {MultiChooseTeacher} from '../teacher-choose/teacher-choose.component';

@Component({
  selector: 'app-circle-student-choose',
  templateUrl: './circle-student-choose.component.html',
  styleUrls: ['./circle-student-choose.component.css']
})
export class CircleStudentChooseComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  @Input() circleStudentChooseSign$: Subject<{ circleId: string, haveChoosedStudent: Array<Student>}>
    = new Subject<{ circleId: string, haveChoosedStudent: Array<Student>}>();

  @Output() onStudentChoosed: EventEmitter<Array<Student>> = new EventEmitter< Array<Student>>();
  isCircleStudentChooseModalShow = false;
  studentList: Array<MultiChooseStudent> = new Array<MultiChooseStudent>() ;
  entFilter = '';
  constructor(private circlesvr: CircleService, private usersvr: UserService) { }

  ngOnInit() {
    this.onQuery();
    this.circleStudentChooseSign$.subscribe(re => {
      this.isCircleStudentChooseModalShow = true;
      re.haveChoosedStudent.forEach(t => {
          this.studentList.filter(o => o.studentId === t.studentId)[0].choosed = true;
        });
    });
  }

  onQuery = (circleId: string) => {
    this.circlesvr.circleStudentList(circleId).pipe(
      map(re => {
        return re as Array<MultiChooseStudent>;
      })
    ).subscribe( re  => {
      this.studentList = re;
      this.studentList.forEach( v => v.choosed = true);
     }
    );
  }

  onMulChoose = () => {
    this.onStudentChoosed.emit(this.studentList.filter(o => o.choosed));
    this.isCircleStudentChooseModalShow = false;
  }


}

export class MultiChooseStudent extends Student {
  choosed: boolean;
  constructor(choosed?: boolean) {
    super({});
    this.choosed = choosed || false;
  }
}
