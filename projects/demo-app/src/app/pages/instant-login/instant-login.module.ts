import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InstantLoginComponent } from './instant-login.component';
import { InstantLoginRoutingModule } from './instant-login-routing.module';
import { OwnidModule } from '../../shared/ownid/ownid.module';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from './../../shared/demo-header/demo-header.module';

@NgModule({
  declarations: [InstantLoginComponent],
  imports: [
    CommonModule,
    InstantLoginRoutingModule,
    ReactiveFormsModule,
    OwnidModule,
    DemoFooterModule,
    DemoHeaderModule
  ]
})
export class InstantLoginModule { }
