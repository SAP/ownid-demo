import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from '../../shared/demo-header/demo-header.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, ResetPasswordRoutingModule, DemoFooterModule, DemoHeaderModule],
})
export class ResetPasswordModule {}
