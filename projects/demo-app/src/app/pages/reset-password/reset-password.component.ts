import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GigyaService } from '../../services/gigya.service';

@Component({
  selector: 'login',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup;

  errors: string | null = null;

  pwrt$: Observable<string>;

  constructor(
    actRoute: ActivatedRoute,
    formBuilder: FormBuilder,
    private gigyaService: GigyaService,
    private router: Router,
  ) {
    this.pwrt$ = actRoute.queryParamMap.pipe(
      filter((params) => !!params.get('pwrt')),
      map((params) => params.get('pwrt') as string),
    );

    this.form = formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit(passwordResetToken: string) {
    if (this.form.valid) {
      this.errors = null;

      const params = {
        passwordResetToken,
        newPassword: this.form.value.password,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.resetPassword(params, (data: any) => {
        if (data.status === 'FAIL') {
          this.errors = data.errorDetails;
          return;
        }

        this.router.navigateByUrl('/login');
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRecover($event: any) {
    console.log($event);
    this.router.navigateByUrl('/login');
  }
}
