import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasemsgRoutingModule } from './basemsg-routing.module';

import { CurrentSchoolComponent } from './current-school/current-school.component';
import { SchoolTeacherComponent } from './school-teacher/school-teacher.component';
import { SchoolClassesComponent } from './school-classes/school-classes.component';
import { SchoolStudentComponent } from './school-student/school-student.component';
import {PubModule} from '../../pub/pub.module';

@NgModule({
  declarations: [ CurrentSchoolComponent, SchoolTeacherComponent, SchoolClassesComponent, SchoolStudentComponent],
  imports: [
    CommonModule,
    BasemsgRoutingModule,
    PubModule
  ]
})
export class BasemsgModule { }
