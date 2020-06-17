import { ChangeDetectionStrategy, Component, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GigyaService } from "@services/gigya.service";
import { AppStore, IProfile } from "../../app.store";
import { SetProfileCommand } from "../sign/commands/set-profile.command";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
  profile$: BehaviorSubject<IProfile>;

  linked$: BehaviorSubject<boolean>;

  constructor(
    private store: AppStore,
    private setProfileCommand: SetProfileCommand,
    private gigyaService: GigyaService,
    private ngZone: NgZone
  ) {
    this.profile$ = this.store.profile$;
    this.linked$ = new BehaviorSubject<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.gigyaService.getProfile((data: any) => {
      this.setProfileCommand.execute(data.profile);
    });
  }

  onLink() {
    this.ngZone.run(() => this.linked$.next(true));
  }

  onLogout() {
    this.gigyaService.logout();
  }
}
