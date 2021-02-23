import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  ngOnInit() {
    const params = {
      screenSet: environment.screenSet,
      startScreen: 'gigya-reset-password-screen',
    };

    // @ts-ignore
    window.gigya.accounts.showScreenSet(params);
  }
}
