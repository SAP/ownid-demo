import { Injectable } from '@angular/core';
import { IDataCommand } from '../../i-data-command';
import { AppStore, IProfile } from '../../../app.store';

@Injectable()
export class SetProfileCommand implements IDataCommand<IProfile> {
  constructor(private store: AppStore) {}

  execute(profile: IProfile): void {
    this.store.profile$.next(profile);
  }
}
