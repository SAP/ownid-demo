import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  onLogin() {
    const params = {
      screenSet: 'Default-RegistrationLogin',
      startScreen: 'gigya-login-screen',
    };

    // @ts-ignore
    window.gigya.accounts.showScreenSet(params);
  }
}
