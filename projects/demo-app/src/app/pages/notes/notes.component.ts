import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppStore, IProfile } from '../../app.store';
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

  profile$: Observable<IProfile>;

  showTooltip = false;

  showProfileTooltip = false;

  showAccount = false;

  TfaEnforceAllowed$: BehaviorSubject<boolean>;

  showEnforceTfaText$: BehaviorSubject<boolean>;

  constructor(
    private appStore: AppStore,
    private addNoteCommand: AddNoteCommand,
    private deleteNoteCommand: DeleteNoteCommand,
    private gigyaService: GigyaService,
    private getNotesCommand: GetNotesCommand,
  ) {
    this.profile$ = this.appStore.profile$;

    this.showEnforceTfaText$ = new BehaviorSubject<boolean>(false);
    this.TfaEnforceAllowed$ = new BehaviorSubject<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.gigyaService.getProfile((accountInfo: any) => {
      const enforceTfa = !!accountInfo.data.ownId?.settings?.enforceTfa;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasTfaConnections = accountInfo.data.ownId?.connections?.every((connection: any) => {
        return (
          connection.authType !== 'basic' ||
          (!connection.authType && !!connection.fido2CredentialId && !!connection.fido2SignatureCounter)
        );
      });

      const hasConnections = (accountInfo.data?.ownId?.connections?.length ?? 0) > 0;

      this.TfaEnforceAllowed$.next(!enforceTfa && !hasTfaConnections && hasConnections);
    });
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

  onTfaEnforce() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.gigyaService.getProfile((accountInfo: any) => {
      accountInfo.data = {
        ...accountInfo.data,
        ownId: {
          settings: {
            ...accountInfo.data.ownId.settings,
            enforceTfa: true,
          },
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.setData(accountInfo.data, () => {
        this.showEnforceTfaText$.next(true);
      });
    });
  }
}
