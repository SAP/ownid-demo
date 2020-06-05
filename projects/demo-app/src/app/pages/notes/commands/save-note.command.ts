import { Injectable } from '@angular/core';
import { AppStore, INote } from '../../../app.store';
import { IDataCommand } from '../../i-data-command';

@Injectable()
export class SaveNoteCommand implements IDataCommand<INote> {
  constructor(
    private store: AppStore,
  ) {}

  execute(note: INote) {
    const notes = this.store.notes$.getValue();
    console.log(notes, note);

    // call gigya save notes
  }
}
