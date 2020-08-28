import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GigyaService } from '../../services/gigya.service';

@Component({
  selector: 'login',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: FormGroup;

  emailSent = false;

  errors: string | null = null;

  constructor(
    formBuilder: FormBuilder,
    private gigyaService: GigyaService,
    private router : Router,
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errors = null;

      const params = {
        loginID: this.form.value.email,
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.resetPassword(params, (data: any) => {
        if (data.status === 'FAIL') {
          this.errors = data.errorDetails;
          return;
        }

        this.emailSent = true;
      });
    }
  }

  onGoToLogin() {
    this.router.navigateByUrl('/')
  }
}
