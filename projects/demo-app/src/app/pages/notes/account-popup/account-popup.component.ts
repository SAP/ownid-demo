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

  enableTfaAllowed$: BehaviorSubject<boolean>;

  showTfaEnabledText$: BehaviorSubject<boolean>;

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

    this.showTfaEnabledText$ = new BehaviorSubject<boolean>(false);
    this.enableTfaAllowed$ = new BehaviorSubject<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.gigyaService.getProfile((accountInfo: any) => {
      const tfaEnabled = !!accountInfo.data.userSettings?.tfaEnabled;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasTfaConnections = accountInfo.data?.ownIdConnections?.some((connection: any) => {
        return !!connection.fido2CredentialId && !!connection.fido2SignatureCounter;
      });

      this.enableTfaAllowed$.next(!tfaEnabled && !hasTfaConnections);
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

  onEnableTFA() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.gigyaService.getProfile((accountInfo: any) => {
      accountInfo.data = {
        ...accountInfo.data,
        userSettings: {
          ...accountInfo.data.userSettings,
          tfaEnabled: true,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.setData(accountInfo.data, () => {
        this.showTfaEnabledText$.next(true);
      });
    });
  }
}
