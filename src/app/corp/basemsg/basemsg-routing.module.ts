import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SinginComponent} from '../../account/singin/singin.component';
import {SchoolComponent} from './school/school.component';
import {StudentComponent} from './student/student.component';
import {TeacherComponent} from './teacher/teacher.component';
import { CircleComponent } from './circle/circle.component';

const routes: Routes = [
  { path : '' , redirectTo : 'school', pathMatch: 'full'},
  { path: 'school', component: SchoolComponent },
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'circle', component: CircleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasemsgRoutingModule { }
