import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { OwnidModule } from '../../shared/ownid/ownid.module';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from '../../shared/demo-header/demo-header.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, OwnidModule, DemoFooterModule, DemoHeaderModule],
})
export class LoginModule {}
