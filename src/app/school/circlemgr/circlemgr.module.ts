import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CirclemgrRoutingModule } from './circlemgr-routing.module';
import { SchoolCircleComponent } from './school-circle/school-circle.component';

@NgModule({
  declarations: [ SchoolCircleComponent],
  imports: [
    CommonModule,
    CirclemgrRoutingModule
  ]
})
export class CirclemgrModule { }
