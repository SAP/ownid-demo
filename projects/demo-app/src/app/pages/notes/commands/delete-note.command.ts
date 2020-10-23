import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../app.store';
import { IDataCommand } from '../../i-data-command';

@Injectable()
export class DeleteNoteCommand implements IDataCommand<string> {
  constructor(private router: Router, private store: AppStore) {}

  execute(noteId: string) {
    const notes = this.store.notes$.getValue();
    const newNotes = notes.filter(({ id }) => id !== noteId);

    this.store.notes$.next(newNotes);

    this.router.navigateByUrl(`/notes${newNotes[0] ? `/${newNotes[0].id}` : ''}`);
  }
}
