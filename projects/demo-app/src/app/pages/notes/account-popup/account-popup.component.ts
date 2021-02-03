import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppStore, IProfile } from '../../../app.store';
import { GigyaService } from '../../../services/gigya.service';

@Component({
  selector: 'account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPopupComponent implements OnChanges {
  @Input() profile: IProfile | null = null;

  @Output() onClick = new EventEmitter();

  errors$: BehaviorSubject<string | null>;

  form: FormGroup;

  isOwnidUser$: Observable<boolean>;

  TfaEnforceAllowed$: BehaviorSubject<boolean>;

  showEnforceTfaText$: BehaviorSubject<boolean>;

  constructor(
    formBuilder: FormBuilder,
    private store: AppStore,
    private ngZone: NgZone,
    private gigyaService: GigyaService,
  ) {
    this.isOwnidUser$ = this.store.isOwnidUser$;

    this.errors$ = new BehaviorSubject<string | null>(null);

    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['password', [Validators.required]],
    });

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

  ngOnChanges() {
    this.form.get('name')?.setValue(this.profile?.name);
    this.form.get('email')?.setValue(this.profile?.email);
  }

  onLink() {
    this.ngZone.run(() => {
      this.onClick.emit();
    });
  }

  onError(errorMessage: string) {
    this.errors$.next(errorMessage);
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
