import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SinginComponent } from './singin/singin.component';
import {PubModule} from '../pub/pub.module';

@NgModule({
  declarations: [SinginComponent],
  imports: [
    CommonModule,
    PubModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
