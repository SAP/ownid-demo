import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InstantLoginComponent } from './instant-login.component';
import { InstantLoginRoutingModule } from './instant-login-routing.module';
import { OwnidModule } from '../../shared/ownid/ownid.module';

@NgModule({
  declarations: [InstantLoginComponent],
  imports: [
    CommonModule,
    InstantLoginRoutingModule,
    ReactiveFormsModule,
    OwnidModule,
  ]
})
export class InstantLoginModule { }
