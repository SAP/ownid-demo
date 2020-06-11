import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IProfile } from '../../../app.store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
   ngOnChanges() {
    this.form.get('name')?.setValue(this.profile?.name);
    this.form.get('email')?.setValue(this.profile?.email);
   }
}
