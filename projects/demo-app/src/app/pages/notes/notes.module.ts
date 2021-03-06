import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { AddNoteCommand } from './commands/add-note.command';
import { SaveNoteCommand } from './commands/save-note.command';
import { DeleteNoteCommand } from './commands/delete-note.command';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { ClickOutsideModule } from '../../shared/click-outside/click-outside.module';
import { GetNotesCommand } from './commands/get-notes.command';
import { AccountPopupComponent } from './account-popup/account-popup.component';
import { OwnidModule } from '../../shared/ownid/ownid.module';
import { GigyaService } from '../../services/gigya.service';
import { DemoFooterModule } from '../../shared/demo-footer/demo-footer.module';
import { DemoHeaderModule } from '../../shared/demo-header/demo-header.module';

@NgModule({
  declarations: [NotesComponent, NoteEditComponent, AccountPopupComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    OwnidModule,
    DemoFooterModule,
    DemoHeaderModule,
  ],
  providers: [AddNoteCommand, SaveNoteCommand, DeleteNoteCommand, GetNotesCommand, GigyaService],
})
export class NotesModule {}
