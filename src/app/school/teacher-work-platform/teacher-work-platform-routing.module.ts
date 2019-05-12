import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesMgrComponent} from './classes-mgr/classes-mgr.component';
import {ClassesCircleComponent} from './classes-circle/classes-circle.component';
import {ExamMgrComponent} from './exam-mgr/exam-mgr.component';
import {TeacherLessonsComponent} from './teacher-lessons/teacher-lessons.component';
import {TeacherArticleComponent} from "./teacher-article/teacher-article.component";
import {TeacherNoticeComponent} from "./teacher-notice/teacher-notice.component";

const routes: Routes = [
  { path : '' , redirectTo : 'classesmgr', pathMatch: 'full'},
  { path: 'classesmgr', component: ClassesMgrComponent},
  { path: 'classescircle', component: ClassesCircleComponent},
  { path: 'teacherarticle', component: TeacherArticleComponent},
  { path: 'teacherlessons', component: TeacherLessonsComponent},
  { path: 'exammgr', component: ExamMgrComponent},
  { path: 'teachernotice', component: TeacherNoticeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherWorkPlatformRoutingModule { }
