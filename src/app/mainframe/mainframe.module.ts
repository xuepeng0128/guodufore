import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainframeRoutingModule } from './mainframe-routing.module';
import { FrameComponent } from './frame/frame.component';
import { HomeComponent } from './home/home.component';
import {PubModule} from '../pub/pub.module';

@NgModule({
  declarations: [FrameComponent, HomeComponent],
  imports: [
    CommonModule,
    PubModule,
    MainframeRoutingModule
  ]
})
export class MainframeModule { }
