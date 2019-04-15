import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: './mainframe/mainframe.module#MainframeModule' }, // 程序主框架
  { path: 'account', loadChildren: './account/account.module#AccountModule' }, // 账号管理模块
  { path: '404', component: NotFoundComponent }, // 未找到页面
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
