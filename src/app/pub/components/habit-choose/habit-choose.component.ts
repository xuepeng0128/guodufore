import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/user.service';
import {map} from 'rxjs/operators';
import {Habit} from '../../../entity/Habit';
import {HabitService} from '../../../shared/service/business/habit.service';
import {IHabitQueryParams} from '../../../shared/interface/queryparams/IHabitQueryParams';

@Component({
  selector: 'app-habit-choose',
  templateUrl: './habit-choose.component.html',
  styleUrls: ['./habit-choose.component.css']
})
export class HabitChooseComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  @Input() habitChooseSign$: Subject<{ singleChoose: boolean, haveChoosedHabit: Array<Habit>}>
    = new Subject<{ singleChoose: boolean, haveChoosedHabit: Array<Habit>}>();

  @Output() onHabitChoosed: EventEmitter<Habit> = new EventEmitter<Habit>();
  singleChoose = true;
  isHabitChooseModalShow = false;
  habitList: Array<Habit> = new Array<Habit>() ;
  total = 0;
  entFilter = '';
  queryParams: IHabitQueryParams = {
    buildTeacherId : this.user.teacher.teacherId,
    schoolId : this.user.user.schoolId,
    pageSize : 1000,
    pageNo : 1,
    pageBegin : 0
  };
  constructor(private habitsvr: HabitService, private usersvr: UserService) { }

  ngOnInit() {
    this.onQuery();
    this.habitChooseSign$.subscribe(re => {
      this.isHabitChooseModalShow = true;
      this.singleChoose = re.singleChoose;
    });
  }

  onQuery = () => {
    this.habitsvr.habitList(this.queryParams).pipe(
      map(re => {
        return  re.filter(o => new Date(o.putCardEndDate.toString()).getTime() > new Date().getTime());
      })
    ).subscribe( re => {
      this.habitList = re;
    });
  }

  onSingleChoose = (habit: Habit) => {
    this.onHabitChoosed.emit(habit);
    this.isHabitChooseModalShow = false;
  }

  onMulChoose = () => {

  }


}

