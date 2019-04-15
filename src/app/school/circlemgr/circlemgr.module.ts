import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirclemgrRoutingModule } from './circlemgr-routing.module';
import { SchoolCircleComponent } from './school-circle/school-circle.component';
<<<<<<< HEAD

@NgModule({
  declarations: [ SchoolCircleComponent],
=======
import { SchoolManagerHabitComponent } from './school-manager-habit/school-manager-habit.component';
import { TeacherHabitComponent } from './teacher-habit/teacher-habit.component';

@NgModule({
  declarations: [ SchoolCircleComponent, SchoolManagerHabitComponent, TeacherHabitComponent],
>>>>>>> 3b8492a2de1d4e167415f732a07d04935f29e0e2
  imports: [
    CommonModule,
    CirclemgrRoutingModule
  ]
})
export class CirclemgrModule { }
