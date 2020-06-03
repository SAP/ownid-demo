import { Component, ChangeDetectionStrategy } from "@angular/core";
import { IProfile } from "../../app.store";
import { SetProfileCommand } from "./commands/set-profile.command";

export interface IOwnidRs {
  status: boolean;
  identities: IProfile;
}

@Component({
  selector: "sign-page",
  templateUrl: "./sign-page.component.html",
  styleUrls: ["./sign-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignPageComponent {
  constructor(private setProfileCommand: SetProfileCommand) {}

  onLogin(data: IOwnidRs): void {
    this.setProfileCommand.execute(data.identities);
  }

  onRegister(data: IOwnidRs): void {
    this.setProfileCommand.execute(data.identities);
  }
}
