import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { OwnidModule } from "../../shared/ownid/ownid.module";
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";
import { ResetPasswordComponent } from "./reset-password.component";

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    OwnidModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ResetPasswordModule {}
