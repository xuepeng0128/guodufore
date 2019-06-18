import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesMgrComponent} from './classes-mgr/classes-mgr.component';
import {ClassesCircleComponent} from './classes-circle/classes-circle.component';
import {ExamMgrComponent} from './exam-mgr/exam-mgr.component';
import {TeacherLessonsComponent} from './teacher-lessons/teacher-lessons.component';
import {TeacherArticleComponent} from './teacher-article/teacher-article.component';
import {TeacherNoticeComponent} from './teacher-notice/teacher-notice.component';
import {TeacherHabitComponent} from './teacher-habit/teacher-habit.component';
import {TeacherArticleDetailComponent} from './teacher-article-detail/teacher-article-detail.component';
import {TeacherLessonsDetailComponent} from './teacher-lessons-detail/teacher-lessons-detail.component';
import {ClassesCircleDetailComponent} from './classes-circle-detail/classes-circle-detail.component';
import {ExamMgrDetailComponent} from "./exam-mgr-detail/exam-mgr-detail.component";
import {StudentPutCardComponent} from "./student-put-card/student-put-card.component";

const routes: Routes = [
  { path : '' , redirectTo : 'classesmgr', pathMatch: 'full'},
  { path: 'classesmgr', component: ClassesMgrComponent},
  { path: 'classescircle', component: ClassesCircleComponent},
  { path: 'classescircledetail', component: ClassesCircleDetailComponent},
  { path: 'teacherhabit', component: TeacherHabitComponent},
  { path: 'studentputcard', component:StudentPutCardComponent},
  { path: 'teacherarticle', component: TeacherArticleComponent},
  { path: 'teacherarticledetail', component: TeacherArticleDetailComponent},
  { path: 'teacherlessons', component: TeacherLessonsComponent},
  { path: 'teacherlessonsdetail', component: TeacherLessonsDetailComponent},
  { path: 'exammgr', component: ExamMgrComponent},
  { path: 'exammgrdetail', component: ExamMgrDetailComponent},
  { path: 'teachernotice', component: TeacherNoticeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherWorkPlatformRoutingModule { }
