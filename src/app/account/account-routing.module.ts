import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SinginComponent} from './singin/singin.component';

const routes: Routes = [
  { path : '' , redirectTo : 'signin', pathMatch: 'full'},
  { path: 'signin', component: SinginComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
