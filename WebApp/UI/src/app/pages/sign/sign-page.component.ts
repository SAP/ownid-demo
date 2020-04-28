import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignPageComponent {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onLogin(data: any) {
    // eslint-disable-next-line no-console
    console.log('onLogin:', data);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onRegister(data: any) {
    // eslint-disable-next-line no-console
    console.log('onRegister:', data);
  }
}
