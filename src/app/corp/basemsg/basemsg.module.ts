import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasemsgRoutingModule } from './basemsg-routing.module';
import { SchoolComponent } from './school/school.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CircleComponent } from './circle/circle.component';
import { PubModule } from 'src/app/pub/pub.module';

@NgModule({
  declarations: [SchoolComponent, StudentComponent, TeacherComponent, CircleComponent],
  imports: [
    CommonModule,
    PubModule,
    BasemsgRoutingModule
  ]
})
export class BasemsgModule { }
