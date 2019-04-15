import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirclemgrRoutingModule } from './circlemgr-routing.module';
import { SchoolCircleComponent } from './school-circle/school-circle.component';
import { SchoolManagerHabitComponent } from './school-manager-habit/school-manager-habit.component';
import { TeacherHabitComponent } from './teacher-habit/teacher-habit.component';

@NgModule({
  declarations: [ SchoolCircleComponent, SchoolManagerHabitComponent, TeacherHabitComponent],
  imports: [
    CommonModule,
    CirclemgrRoutingModule
  ]
})
export class CirclemgrModule { }
