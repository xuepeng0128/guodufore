import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasemsgRoutingModule } from './basemsg-routing.module';

import { CurrentSchoolComponent } from './current-school/current-school.component';
import { SchoolTeacherComponent } from './school-teacher/school-teacher.component';
import { SchoolClassesComponent } from './school-classes/school-classes.component';

@NgModule({
  declarations: [ CurrentSchoolComponent, SchoolTeacherComponent, SchoolClassesComponent],
  imports: [
    CommonModule,
    BasemsgRoutingModule
  ]
})
export class BasemsgModule { }
