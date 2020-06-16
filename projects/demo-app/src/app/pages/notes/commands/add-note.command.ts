import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore, INote } from '../../../app.store';
import { ICommand } from '../../i-command';

@Injectable()
export class AddNoteCommand implements ICommand {
  constructor(
    private router: Router,
    private store: AppStore,
  ) {}

  execute() {
    const newNote: INote = {
      id: Date.now().toString(),
      body: '',
      characters: 0,
      words: 0,
      created: Date.now().toString(),
      updated: Date.now().toString(),
    };

    const notes = this.store.notes$.getValue();

    notes.unshift(newNote);

    this.store.notes$.next(notes);

    this.router.navigateByUrl(`/notes/${  newNote.id}`);
  }
}
