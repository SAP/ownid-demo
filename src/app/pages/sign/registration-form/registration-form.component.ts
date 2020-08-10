import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GigyaService } from '@services/gigya.service';
import { Router } from '@angular/router';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  form: FormGroup;

  errors: string | null = null;

  public constructor(formBuilder: FormBuilder, private gigyaService: GigyaService, private router: Router) {
    this.form = formBuilder.group({
      lastName: [''],
      firstName: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  hide = true;

  hideConfirm = true;

  register(): void {
    this.errors = null;
    if (this.form.valid) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.register(this.form.value, (data: any) => {
        if (data.status === 'FAIL') {
          this.errors = data.errorDetails;
        } else {
          this.router.navigateByUrl('/account');
        }
      });
    }
  }
}
