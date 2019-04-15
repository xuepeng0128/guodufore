import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrameComponent} from './frame/frame.component';
import {AuthGuardService} from '../shared/service/baseapi/auth-guard.service';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path : '' , redirectTo : 'frame', pathMatch: 'full'},
  {
      path: 'frame', component: FrameComponent,
      canActivate: [AuthGuardService],
      children: [
        { path : '' , redirectTo : 'home', pathMatch: 'full'},
        { path: 'home', component: HomeComponent }, // 首页
        { path: 'corpbasemsg', loadChildren: './../corp/basemsg/basemsg.module#BasemsgModule' }, //
        { path: 'corpdic', loadChildren: './../corp/dic/dic.module#DicModule' }, //
        { path: 'corpsystem', loadChildren: './../corp/system/system.module#SystemModule' }, //
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainframeRoutingModule { }
