import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
   this.form = formBuilder.group({
     email: ['', [Validators.email, Validators.required]],
     password: ['', [Validators.required]],
   });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('valid');
      // call gigya login
    }
    console.log(this.form.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLogin($event: any) {
    console.log($event);
    // call gigya login
  }
}
