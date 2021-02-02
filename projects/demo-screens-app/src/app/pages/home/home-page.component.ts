import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  onLogin() {
    const params = {
      screenSet: environment.screenSet,
      startScreen: 'gigya-login-screen',
    };

    // @ts-ignore
    window.gigya.accounts.showScreenSet(params);
  }
}
