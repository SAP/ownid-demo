import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppStore, IProfile } from '../../../app.store';
// import { GigyaService } from '../../../services/gigya.service';

@Component({
  selector: 'account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPopupComponent implements OnChanges {

  @Input() profile: IProfile | null = null;

  @Output() onClick = new EventEmitter();

  form: FormGroup;

  isOwnidUser$: Observable<boolean>;

  constructor(
    formBuilder: FormBuilder,
    // private gigyaService: GigyaService,
    private store: AppStore,
    private ngZone: NgZone
  ) {

    this.isOwnidUser$ = this.store.isOwnidUser$;

    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['password', [Validators.required]],
    });
  }

  ngOnChanges() {
    this.form.get('name')?.setValue(this.profile?.name);
    this.form.get('email')?.setValue(this.profile?.email);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLink($event: any) {
    if ($event.status) {
      this.ngZone.run(() => {
        // this.gigyaService.setOwnidUser(true);
        this.onClick.emit();
      });
    }
  }
}
