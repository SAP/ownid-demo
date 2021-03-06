import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GigyaService {
  constructor(private router: Router, private ngZone: NgZone) {}

  isLoggedIn() {
    return new Observable<boolean>((observer) => {
      // @ts-ignore
      window.gigya!.accounts.getAccountInfo({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (data: any) =>
          this.ngZone.run(() => {
            observer.next(data.status === 'OK');
            observer.complete();
          }),
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login({ email, password }: any, callback: (profile: any) => void) {
    // @ts-ignore
    window.gigya!.accounts.login({
      loginID: email,
      password,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (data: any) => this.ngZone.run(() => callback(data)),
    });
  }

  register(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { email, firstName, lastName, data }: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (profile: any) => void,
  ) {
    const password = this.generateRandomString(12);
    // @ts-ignore
    window.gigya!.accounts.initRegistration({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (response: any) => {
        // @ts-ignore
        window.gigya!.accounts.register({
          regToken: response.regToken,
          email,
          password,
          profile: {
            firstName,
            lastName,
          },
          data,
          finalizeRegistration: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (res: any) => this.ngZone.run(() => callback(res)),
        });
      },
    });
  }

  logout() {
    // @ts-ignore
    window.gigya!.accounts.logout({
      callback: () => this.ngZone.run(() => this.router.navigateByUrl('/login')),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProfile(callback: (profile: any) => void) {
    // @ts-ignore
    window.gigya!.accounts.getAccountInfo({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (data: any) => this.ngZone.run(() => callback(data)),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetPassword(params: any, callback: (data: any) => void) {
    // @ts-ignore
    window.gigya!.accounts.resetPassword({
      ...params,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (data: any) => this.ngZone.run(() => callback(data)),
    });
  }

  private generateRandomString(length: number): string {
    let result = '';
    const possibleChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) result += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    return result;
  }
}
