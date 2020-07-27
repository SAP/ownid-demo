import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GigyaService } from '@services/gigya.service';

import { InstantRegistrationComponent } from './instant-registration.component';
import { InstantRegistrationRoutingModule } from './instant-registration-routing.module';
import { OwnidModule } from '../../shared/ownid/ownid.module';
import { CustomRegistrationCommand } from './commands/custom-registration.command';

@NgModule({
  declarations: [InstantRegistrationComponent],
  imports: [
    CommonModule,
    InstantRegistrationRoutingModule,
    ReactiveFormsModule,
    OwnidModule,
  ],
  providers: [
    CustomRegistrationCommand,
    GigyaService,
  ]
})
export class InstantRegistrationModule { }
