import { Injectable } from '@angular/core';
import { AppStore } from '../../../app.store';
import { ICommand } from '../../i-command';

@Injectable()
export class SaveNoteCommand implements ICommand {
  constructor(
    private store: AppStore,
  ) {}

  execute() {
    const notes = this.store.notes$.getValue();

    this.store.notes$.next(notes);
  }
}
