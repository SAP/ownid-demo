import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AppStore, INote, IProfile } from '../../app.store';
import { AddNoteCommand } from './commands/add-note.command';
import { DeleteNoteCommand } from './commands/delete-note.command';
import { GigyaService } from '../../services/gigya.service';
import { GetNotesCommand } from './commands/get-notes.command';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  sidebarClosed = false;

  mobSidebarClosed = false;

  notes$: Observable<INote[]>;

  note$: Observable<INote | undefined>;

  profile$: Observable<IProfile>;

  showTooltip = false;

  showProfileTooltip = false;

  showAccount = false;

  constructor(
    private actRoute: ActivatedRoute,
    private appStore: AppStore,
    private addNoteCommand: AddNoteCommand,
    private deleteNoteCommand: DeleteNoteCommand,
    private gigyaService: GigyaService,
    private getNotesCommand: GetNotesCommand,
  ) {
    const noteId$ = this.actRoute.paramMap.pipe(
      filter((params) => !!params.get('id')),
      map((params) => params.get('id') as string),
    );
    this.notes$ = this.appStore.notes$;
    this.profile$ = this.appStore.profile$;

    this.note$ = combineLatest(this.notes$, noteId$).pipe(
      map(([notes, noteId]) => notes.find(({ id }) => id === noteId)),
    );
  }

  ngOnInit(): void {
    this.getNotesCommand.execute();
  }

  addNote() {
    this.addNoteCommand.execute();
  }

  deleteNote(noteId: string) {
    this.mobSidebarClosed = false;
    this.deleteNoteCommand.execute(noteId);
  }

  openTooltip() {
    this.showTooltip = true;
  }

  onLogout() {
    this.gigyaService.logout();
  }
}
