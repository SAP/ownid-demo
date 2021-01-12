import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GigyaService } from '../../services/gigya.service';

@Component({
  selector: 'login',
  templateUrl: './instant-login.component.html',
  styleUrls: ['./instant-login.component.scss'],
})
export class InstantLoginComponent {
  form: FormGroup;

  errors: string | null = null;

  constructor(formBuilder: FormBuilder, private gigyaService: GigyaService, private router: Router) {
    this.form = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.errors = null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.login(this.form.value, (data: any) => {
        if (data.status === 'FAIL') {
          this.errors = data.errorDetails;
        }
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin(statusRS: any) {
    document.cookie = `${statusRS.sessionInfo.cookieName}=${statusRS.sessionInfo.cookieValue}; path=/`;
    this.gigyaService.setOwnidUser(true, () => this.router.navigateByUrl('/account'));
  }
}
