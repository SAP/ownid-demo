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
  
  showForm = false;
  
  registerResponse: any;

  public constructor(formBuilder: FormBuilder, private gigyaService: GigyaService, private router: Router) {
    this.form = formBuilder.group({
      lastName: [''],
      firstName: [''],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  register(): void {
    this.errors = null;
    if (this.form.valid) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.gigyaService.register({...this.form.value, data: {ownIdConnections : [ this.registerResponse ]}}, (data: any) => {
        if (data.status === 'FAIL') {
          this.errors = data.errorDetails;
        } else {
          this.router.navigateByUrl('/account');
        }
      });
    }
  }

  onSuccessOwnIdResgister(data: any): void {
    this.showForm = true;
    this.registerResponse = data;
  }
}
