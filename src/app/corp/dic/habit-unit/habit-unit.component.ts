import { Component, OnInit } from '@angular/core';
import {HabitUnit} from "../../../entity/HabitUnit";
import {HabitUnitService} from "../../../shared/service/dic/habit-unit.service";
import {Habit} from "../../../entity/Habit";

@Component({
  selector: 'app-habit-unit',
  templateUrl: './habit-unit.component.html',
  styleUrls: ['./habit-unit.component.css']
})
export class HabitUnitComponent implements OnInit {
  isHabitUnitModalShow = false;
  habitUnitList : Array<HabitUnit> =new Array<HabitUnit>();
  currentUnit : HabitUnit = new HabitUnit('');
  constructor(private habitunitsvr : HabitUnitService) { }

  ngOnInit() {
       this.habitunitsvr.habitUnitList().subscribe(
         re => this.habitUnitList=re.concat(new HabitUnit(''))
       );
  }

  onEdit=(unit : HabitUnit) =>{
    this.currentUnit=unit;
    this.isHabitUnitModalShow=true;
  }
  onSave=()=>{
     this.habitunitsvr.insertHabitUnit(this.currentUnit).subscribe(
       re => {
         if (this.habitUnitList[this.habitUnitList.length-1].unitName !='')
         {
           this.habitUnitList=this.habitUnitList.concat(new HabitUnit(''));

         }
         this.isHabitUnitModalShow=false;
       }
     );

  }
}
