import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppStore } from '../../app.store';
import { RegistrationCommand } from './commands/registration.command';

@Component({
  selector: 'login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  form: FormGroup;

  errors$: BehaviorSubject<string | null>;

  private ownidWidget: unknown | null = null;

  constructor(
    formBuilder: FormBuilder,
    private appStore: AppStore,
    private registrationCommand: RegistrationCommand,
  ) {
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', []],
      confirmPassword: ['', []],
    });

    this.errors$ = this.appStore.formError$;
  }

  onSubmit() {
    if (this.form.valid && this.ownidWidget) {
      this.registrationCommand.execute({ data: this.form.value, ownidWidget: this.ownidWidget })
    }

    Object.values(this.form.controls).forEach((field: AbstractControl) => {
      field.setValue(field.value);
      field.markAsTouched();
    });
  }

  onOwnIDWidgetReady(ownidWidget: unknown) {
    this.ownidWidget = ownidWidget;
  }

  onError(errorMessage: string) {
    this.errors$.next(errorMessage);
  }
}
