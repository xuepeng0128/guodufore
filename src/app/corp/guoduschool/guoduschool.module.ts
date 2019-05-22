import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuoduschoolRoutingModule } from './guoduschool-routing.module';
import { FreeTeacherMgrComponent } from './free-teacher-mgr/free-teacher-mgr.component';
import { FreeStudentMgrComponent } from './free-student-mgr/free-student-mgr.component';
import { FreeCircleMgrComponent } from './free-circle-mgr/free-circle-mgr.component';

@NgModule({
  declarations: [FreeTeacherMgrComponent, FreeStudentMgrComponent, FreeCircleMgrComponent],
  imports: [
    CommonModule,
    GuoduschoolRoutingModule
  ]
})
export class GuoduschoolModule { }
