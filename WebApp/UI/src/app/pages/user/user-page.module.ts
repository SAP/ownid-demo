import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserPageComponent } from './user-page.component';
import { UserPageRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule, UserPageRoutingModule, MatCardModule],
})
export class UserPageModule {}
