import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginUser} from '../../../entity/LoginUser';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/user.service';
import {HabitTemplate} from '../../../entity/HabitTemplate';
import {HabitTemplateService} from '../../../shared/service/dic/habit-template.service';

@Component({
  selector: 'app-habit-template-choose',
  templateUrl: './habit-template-choose.component.html',
  styleUrls: ['./habit-template-choose.component.css']
})
export class HabitTemplateChooseComponent implements OnInit {
  user: LoginUser = this.usersvr.getUserStorage();
  @Input() habitTemplateChooseSign$: Subject<string>
    = new Subject<string>();

  @Output() onHabitTemplateChoosed: EventEmitter<HabitTemplate> = new EventEmitter<HabitTemplate>();

  isHabitTemplateChooseModalShow = false;
  habitTemplateList: Array<HabitTemplate> = new Array<HabitTemplate>() ;
  constructor(private habittemplatesvr: HabitTemplateService, private usersvr: UserService) { }

  ngOnInit() {
    this.onQuery();
    this.habitTemplateChooseSign$.subscribe(re => {
      this.isHabitTemplateChooseModalShow = true;
    });
  }

  onQuery = () => {
    this.habittemplatesvr.habitTemplateList(0, 1000).subscribe( re =>
      this.habitTemplateList = re
    );
  }

  onSingleChoose = (habitTemplate: HabitTemplate) => {
    this.onHabitTemplateChoosed.emit(habitTemplate);
    this.isHabitTemplateChooseModalShow = false;
  }

}
