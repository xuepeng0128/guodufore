import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchoolCircleComponent} from './school-circle/school-circle.component';


const routes: Routes = [
  { path : '' , redirectTo : 'schoolcircle', pathMatch: 'full'},
  { path: 'schoolcircle', component: SchoolCircleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CirclemgrRoutingModule { }
