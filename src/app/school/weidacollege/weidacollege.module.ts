import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeidacollegeRoutingModule } from './weidacollege-routing.module';
import { CurriculumMgrComponent } from './curriculum-mgr/curriculum-mgr.component';

@NgModule({
  declarations: [CurriculumMgrComponent],
  imports: [
    CommonModule,
    WeidacollegeRoutingModule
  ]
})
export class WeidacollegeModule { }
