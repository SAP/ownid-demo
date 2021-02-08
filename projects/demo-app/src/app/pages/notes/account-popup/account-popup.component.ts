import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IProfile } from '../../../app.store';

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

  constructor(formBuilder: FormBuilder, private ngZone: NgZone) {
    this.errors$ = new BehaviorSubject<string | null>(null);

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

  onLink() {
    this.ngZone.run(() => this.onClick.emit());
  }

  onError(errorMessage: string) {
    this.errors$.next(errorMessage);
  }
}
