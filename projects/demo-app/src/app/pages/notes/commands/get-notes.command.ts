import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStore } from '../../../app.store';
import { GigyaService } from '../../../services/gigya.service';
import { ICommand } from '../../i-command';

@Injectable()
export class GetNotesCommand implements ICommand {
  private subscription: Subscription | undefined;

  constructor(
    private gigyaService: GigyaService,
    private store: AppStore,
  ) {}

  execute() {
    if (this.subscription) {
      return;
    }

    this.gigyaService.getProfile((userData) => {
      this.store.notes$.next(userData.data.notes);

      this.store.profile$.next({
        isOwnidUser: false,
        name: userData.profile.firstName,
        email: userData.profile.email,
      });
    });

    this.subscription = this.store.notes$.subscribe((notes) => {
      this.gigyaService.setNotes(notes)
    })
  }
}
