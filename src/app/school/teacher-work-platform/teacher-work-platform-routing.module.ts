import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassesMgrComponent} from './classes-mgr/classes-mgr.component';
import {ClassesCircleComponent} from './classes-circle/classes-circle.component';
import {TeacherWritingComponent} from './teacher-writing/teacher-writing.component';
import {ExamMgrComponent} from './exam-mgr/exam-mgr.component';

const routes: Routes = [
  { path : '' , redirectTo : 'classesmgr', pathMatch: 'full'},
  { path: 'classesmgr', component: ClassesMgrComponent},
  { path: 'classescircle', component: ClassesCircleComponent},
  { path: 'teacherwriting', component: TeacherWritingComponent},
  { path: 'exammgr', component: ExamMgrComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherWorkPlatformRoutingModule { }
