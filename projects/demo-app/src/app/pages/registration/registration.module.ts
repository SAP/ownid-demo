import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { OwnidModule } from '../../../../../../src/app/shared/ownid/ownid.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    OwnidModule,
  ]
})
export class RegistrationModule { }
