import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppStore, IProfile } from '../../app.store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  profile$: BehaviorSubject<IProfile>;

  constructor(private store: AppStore) {
    this.profile$ = this.store.profile$;
  }
}
