import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { AppStore } from '../../app.store';
import { AddNoteCommand } from './commands/add-note.command';
import { SaveNoteCommand } from './commands/save-note.command';
import { DeleteNoteCommand } from './commands/delete-note.command';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { ClickOutsideModule } from '../../shared/click-outside/click-outside.module';

@NgModule({
  declarations: [NotesComponent, NoteEditComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ClickOutsideModule,
  ],
  providers: [
    AppStore,
    AddNoteCommand,
    SaveNoteCommand,
    DeleteNoteCommand,
  ]
})
export class NotesModule {}
