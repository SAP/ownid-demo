import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomRegistrationCommand } from './commands/custom-registration.command';
import { AppStore } from '../../app.store';

@Component({
  selector: 'login',
  templateUrl: './instant-registration.component.html',
  styleUrls: ['./instant-registration.component.scss']
})
export class InstantRegistrationComponent {
  form: FormGroup;

  errors$: Observable<string | null>;

  private pubKey = '';

  constructor(
    formBuilder: FormBuilder,
    private appStore: AppStore,
    private customRegistrationCommand: CustomRegistrationCommand,
  ) {
    this.form = formBuilder.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      skipPassword: [false, []],
      password: ['', []],
    });

    this.errors$ = this.appStore.formError$;
  }

  onSubmit() {
    if (this.form.valid) {

      this.customRegistrationCommand.execute({ ...this.form.value, pubKey: this.pubKey })
    }

    Object.values(this.form.controls).forEach((field: AbstractControl) => {
      field.setValue(field.value);
      field.markAsTouched();
    });
  }

  onRegister(statusRS: { publicKey: string }) {
    this.pubKey = statusRS.publicKey;
  }
}
