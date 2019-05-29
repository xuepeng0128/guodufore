import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherWorkPlatformRoutingModule } from './teacher-work-platform-routing.module';
import { ClassesMgrComponent } from './classes-mgr/classes-mgr.component';
import { ClassesCircleComponent } from './classes-circle/classes-circle.component';
import { ExamMgrComponent } from './exam-mgr/exam-mgr.component';
import {PubModule} from '../../pub/pub.module';
import { TeacherLessonsComponent } from './teacher-lessons/teacher-lessons.component';
import {TeacherArticleComponent} from "./teacher-article/teacher-article.component";
import { TeacherNoticeComponent } from './teacher-notice/teacher-notice.component';
import { TeacherHabitComponent } from './teacher-habit/teacher-habit.component';
import { TeacherArticleDetailComponent } from './teacher-article-detail/teacher-article-detail.component';
import { TeacherLessonsDetailComponent } from './teacher-lessons-detail/teacher-lessons-detail.component';

@NgModule({
  declarations: [ClassesMgrComponent, ClassesCircleComponent,  ExamMgrComponent, TeacherLessonsComponent, TeacherArticleComponent, TeacherNoticeComponent, TeacherHabitComponent, TeacherArticleDetailComponent, TeacherLessonsDetailComponent],
  imports: [
    CommonModule,
    PubModule,
    TeacherWorkPlatformRoutingModule
  ]
})
export class TeacherWorkPlatformModule { }
