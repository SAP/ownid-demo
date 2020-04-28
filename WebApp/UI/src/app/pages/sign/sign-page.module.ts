import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignRoutingModule } from './sign-routing.module';
import { SignPageComponent } from './sign-page.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { OwnidModule } from '../../shared/ownid/ownid.module';

@NgModule({
  declarations: [
    SignPageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    SignRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    OwnidModule,
  ],
})
export class SignPageModule {}
