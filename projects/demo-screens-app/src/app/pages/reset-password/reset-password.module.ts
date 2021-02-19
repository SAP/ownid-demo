import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnidModule } from '../../shared/ownid/ownid.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordCommand } from './commands/reset-password.command';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from '../../shared/demo-header/demo-header.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, ResetPasswordRoutingModule, OwnidModule, DemoFooterModule, DemoHeaderModule],
  providers: [ResetPasswordCommand],
})
export class ResetPasswordModule {}
