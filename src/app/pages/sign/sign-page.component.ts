import { Component, ChangeDetectionStrategy } from "@angular/core";
import { IProfile } from "../../app.store";
import {Router} from "@angular/router";

export interface ISessionInfo {
  cookieName: string;
  cookieValue: string;
}

export interface IOwnidRs {
  status: boolean;
  identities: IProfile;
  sessionInfo: ISessionInfo
}

@Component({
  selector: "sign-page",
  templateUrl: "./sign-page.component.html",
  styleUrls: ["./sign-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignPageComponent {
  constructor(private router: Router) {}
  
  onSuccess(data: IOwnidRs): void {
    document.cookie = `${data.sessionInfo.cookieName}=${data.sessionInfo.cookieValue}; path=/`;
    this.router.navigateByUrl('/account');
  }
}
