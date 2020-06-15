import { Injectable } from '@angular/core';
import { AppStore } from '../../../app.store';
import { GigyaService } from '../../../services/gigya.service';
import { ICommand } from '../../i-command';

@Injectable()
export class GetNotesCommand implements ICommand {
  constructor(
    private gigyaService: GigyaService,
    private store: AppStore,
  ) {}

  execute() {
    this.gigyaService.getProfile((userData) => {
      this.store.notes$.next(userData.data.notes);

      this.store.profile$.next({
        name: userData.profile.firstName,
        email: userData.profile.email,
      });

      this.store.isOwnidUser$.next(!!userData.data.isOwnidUser);
    });

     this.store.notes$.subscribe((notes) => {
      this.gigyaService.setNotes(notes)
    })
  }
}
