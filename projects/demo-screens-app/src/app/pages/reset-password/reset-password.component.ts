import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResetPasswordCommand } from './commands/reset-password.command';
import { AppStore } from '../../app.store';

@Component({
  selector: 'login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  form: FormGroup;

  errors$: BehaviorSubject<string | null>;

  pwrt$: Observable<string>;

  private observer: MutationObserver;

  constructor(
    actRoute: ActivatedRoute,
    formBuilder: FormBuilder,
    appStore: AppStore,
    private resetPasswordCommand: ResetPasswordCommand,
    private router: Router,
    private elementRef: ElementRef,
  ) {
    this.pwrt$ = actRoute.queryParamMap.pipe(
      filter((params) => !!params.get('pwrt')),
      map((params) => params.get('pwrt') as string),
    );

    this.form = formBuilder.group({
      password: ['', []],
      confirmPassword: ['', []],
    });

    this.errors$ = appStore.formError$;

    // @ts-ignore
    this.observer = new MutationObserver(() => window.ownidWidget?.recalculatePosition());

    this.observer.observe(this.elementRef.nativeElement, {
      attributes: false,
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  onSubmit(passwordResetToken: string) {
    if (this.form.valid) {
      this.resetPasswordCommand.execute({ passwordResetToken, password: this.form.value.password });
    }
  }

  onRecover() {
    this.router.navigateByUrl('/login');
  }

  onError(errorMessage: string) {
    this.errors$.next(errorMessage);
  }
}
