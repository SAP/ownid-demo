import {ChangeDetectionStrategy, Component} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppStore, IProfile } from "../../app.store";
import {SetProfileCommand} from "../sign/commands/set-profile.command";
import {GigyaService} from "@services/gigya.service";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
  profile$: BehaviorSubject<IProfile>;
  linked$: BehaviorSubject<boolean>;

  constructor(private store: AppStore, 
              private setProfileCommand: SetProfileCommand,
              private gigyaService: GigyaService) {
    this.profile$ = this.store.profile$;
    this.linked$ =  new BehaviorSubject<boolean>(false);
    
    this.gigyaService.getProfile((data: any)=>{
      this.setProfileCommand.execute(data.profile);
    });
  }
  
  onLink() {
    this.linked$.next(true);
  }
}
