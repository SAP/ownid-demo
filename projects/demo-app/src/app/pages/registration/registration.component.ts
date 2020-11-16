import { Component, ElementRef, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AppStore } from '../../app.store';
import { RegistrationCommand } from './commands/registration.command';

@Component({
  selector: 'login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnDestroy {
  form: FormGroup;

  error$: BehaviorSubject<string | null>;

  errorItems$: BehaviorSubject<string[] | null>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ownidWidget: any | null = null;

  private observer: MutationObserver;

  constructor(
    formBuilder: FormBuilder,
    private appStore: AppStore,
    private registrationCommand: RegistrationCommand,
    private elementRef: ElementRef,
  ) {
    this.form = formBuilder.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', []],
      confirmPassword: ['', []],
    });

    this.error$ = this.appStore.formError$;
    this.errorItems$ = this.appStore.formErrorItems$;

    this.observer = new MutationObserver(() => this.ownidWidget?.recalculatePosition());

    this.observer.observe(this.elementRef.nativeElement, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  onSubmit() {
    if (this.form.valid && this.ownidWidget) {
      this.registrationCommand.execute({ data: this.form.value, ownidWidget: this.ownidWidget });
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
    this.error$.next(errorMessage);
  }
}
