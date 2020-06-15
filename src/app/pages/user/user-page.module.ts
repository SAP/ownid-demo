import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { UserPageComponent } from "./user-page.component";
import { UserPageRoutingModule } from "./user-routing.module";
import {SetProfileCommand} from "../sign/commands/set-profile.command";
import {OwnidModule} from "../../shared/ownid/ownid.module";

@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule, UserPageRoutingModule, MatCardModule, OwnidModule],
  providers: [SetProfileCommand]
})
export class UserPageModule {}
