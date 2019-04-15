import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrentSchoolComponent} from './current-school/current-school.component';
import {SchoolTeacherComponent} from './school-teacher/school-teacher.component';


const routes: Routes = [
  { path : '' , redirectTo : 'currentschool', pathMatch: 'full'},
  { path: 'currentschool', component: CurrentSchoolComponent},
  { path: 'schoolteacher', component: SchoolTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasemsgRoutingModule { }
