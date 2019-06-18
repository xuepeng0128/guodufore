import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeMgrComponent} from './employee-mgr/employee-mgr.component';
import {UserMgrComponent} from './user-mgr/user-mgr.component';
import {PowerMgrComponent} from './power-mgr/power-mgr.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {SchoolAdminMgrComponent} from './school-admin-mgr/school-admin-mgr.component';
import {TrainSchoolAdminComponent} from './train-school-admin/train-school-admin.component';
import {SysParamsComponent} from './sys-params/sys-params.component';
import {SystemInformation} from "../../entity/SystemInformation";
import {SystemInformationComponent} from "./system-information/system-information.component";

const routes: Routes = [
  { path : '' , redirectTo : 'employee', pathMatch: 'full'},
  { path: 'employee', component: EmployeeMgrComponent },
  { path: 'user', component: UserMgrComponent },
  { path: 'userPower', component: PowerMgrComponent },
  { path: 'schoolAdmin', component: SchoolAdminMgrComponent },
  { path: 'trainschoolAdmin', component: TrainSchoolAdminComponent },
  { path: 'sysparams' , component : SysParamsComponent},
  { path: 'changePwd', component: ChangePasswordComponent },
  { path: 'systeminformation', component: SystemInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
