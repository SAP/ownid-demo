import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStore, IProfile } from '../../app.store';
import { GigyaService } from '../../services/gigya.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  sidebarClosed = false;

  profile$: Observable<IProfile>;

  showTooltip = false;

  showProfileTooltip = false;

  showAccount = false;

  constructor(private appStore: AppStore, private gigyaService: GigyaService) {
    this.profile$ = this.appStore.profile$;
  }

  openTooltip() {
    this.showTooltip = true;
  }

  onLogout() {
    this.gigyaService.logout();
  }
}
