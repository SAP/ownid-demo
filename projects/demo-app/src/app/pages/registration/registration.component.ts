import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
   this.form = formBuilder.group({
     name: ['', [Validators.required]],
     email: ['', [Validators.email, Validators.required]],
     password: ['', [Validators.required]],
   });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('valid');
      // call gigya register
    }
    console.log(this.form.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRegister($event: any) {
    console.log($event)
    // call gigya register
  }
}
