import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IDataCommand } from '../../i-data-command';
import { AppStore, IProfile } from '../../../app.store';

@Injectable()
export class SetProfileCommand implements IDataCommand<IProfile> {
  constructor(private router: Router, private store: AppStore) {}

  execute(profile: IProfile) {
    this.store.profile$.next(profile);
    this.router.navigateByUrl('/account');
  }
}