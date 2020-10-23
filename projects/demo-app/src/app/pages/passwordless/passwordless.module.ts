import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordlessComponent } from './passwordless.component';
import { PasswordlessRoutingModule } from './passwordless-routing.module';

@NgModule({
  declarations: [PasswordlessComponent],
  imports: [CommonModule, PasswordlessRoutingModule],
})
export class PasswordlessModule {}
