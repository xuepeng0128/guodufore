import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrentSchoolComponent} from './current-school/current-school.component';
import {SchoolTeacherComponent} from './school-teacher/school-teacher.component';
import {SchoolStudentComponent} from './school-student/school-student.component';
import {SchoolClassesComponent} from './school-classes/school-classes.component';


const routes: Routes = [
  { path : '' , redirectTo : 'currentschool', pathMatch: 'full'},
  { path: 'currentschool', component: CurrentSchoolComponent},
  { path: 'schoolteacher', component: SchoolTeacherComponent},
  { path: 'schoolstudent', component: SchoolStudentComponent},
  { path: 'schoolclasses', component: SchoolClassesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasemsgRoutingModule { }
