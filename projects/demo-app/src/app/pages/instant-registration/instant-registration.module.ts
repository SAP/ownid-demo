import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GigyaService } from '@services/gigya.service';
import { DemoFooterModule } from './../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from './../../shared/demo-header/demo-header.module';

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
    DemoFooterModule,
    DemoHeaderModule
  ],
  providers: [
    CustomRegistrationCommand,
    GigyaService,
  ]
})
export class InstantRegistrationModule { }
