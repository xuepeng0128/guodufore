import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DicRoutingModule } from './dic-routing.module';
import { HabitTemplateComponent } from './habit-template/habit-template.component';
import { TeacherDutyComponent } from './teacher-duty/teacher-duty.component';
import { CorpDutyComponent } from './corp-duty/corp-duty.component';
import { StudySubjectComponent } from './study-subject/study-subject.component';
import {PubModule} from '../../pub/pub.module';
import { SubjectExamClassComponent } from './subject-exam-class/subject-exam-class.component';
import { CircleClassComponent } from './circle-class/circle-class.component';
import { HabitClassComponent } from './habit-class/habit-class.component';
import { HabitUnitComponent } from './habit-unit/habit-unit.component';
import { IconsComponent } from './icons/icons.component';


@NgModule({
  declarations: [HabitTemplateComponent, TeacherDutyComponent, CorpDutyComponent,
    StudySubjectComponent,
    SubjectExamClassComponent,
    CircleClassComponent,
    HabitClassComponent,
    HabitUnitComponent,
    IconsComponent],
  imports: [
    CommonModule,
    PubModule,
    DicRoutingModule
  ]
})
export class DicModule { }
