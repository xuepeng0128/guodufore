import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherWorkPlatformRoutingModule } from './teacher-work-platform-routing.module';
import { ClassesMgrComponent } from './classes-mgr/classes-mgr.component';
import { ClassesCircleComponent } from './classes-circle/classes-circle.component';
import { TeacherWritingComponent } from './teacher-writing/teacher-writing.component';
import { ExamMgrComponent } from './exam-mgr/exam-mgr.component';
import {PubModule} from '../../pub/pub.module';

@NgModule({
  declarations: [ClassesMgrComponent, ClassesCircleComponent, TeacherWritingComponent, ExamMgrComponent],
  imports: [
    CommonModule,
    PubModule,
    TeacherWorkPlatformRoutingModule
  ]
})
export class TeacherWorkPlatformModule { }
