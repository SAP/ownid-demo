import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INote } from '../app.store';

@Injectable()
export class GigyaService {

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) {
    // @ts-ignore
    window.gigya!.accounts.addEventHandlers({
      onLogin: () => this.ngZone.run(() => this.router.navigateByUrl('/notes'))
    });
  }

  isLoggedIn() {
    return new Observable<boolean>((observer) => {
      // @ts-ignore
      window.gigya!.accounts.getAccountInfo({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (data: any) => this.ngZone.run(() => {
          observer.next(data.status === 'OK');
          observer.complete();
        }),
      })
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register({ email, password, name }: any, callback: (profile: any) => void) {
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
            firstName: name,
          },
          finalizeRegistration: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (data: any) => this.ngZone.run(() => callback(data))
        });
      }
    });
  }

  logout() {
    // @ts-ignore
    window.gigya!.accounts.logout({
      callback: () => this.ngZone.run(() => this.router.navigateByUrl('/')),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProfile(callback: (profile: any) => void) {
    // @ts-ignore
    window.gigya!.accounts.getAccountInfo({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (data: any) => this.ngZone.run(() => callback(data))
    });
  }

  setNotes(notes: INote[]) {
    // @ts-ignore
    window.gigya!.accounts.setAccountInfo({ data: { notes } })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData(data: any) {
    // @ts-ignore
    window.gigya!.accounts.setAccountInfo({ data })
  }

  deleteAccount() {
    // @ts-ignore
    window.gigya!.accounts.getAccountInfo({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (data: any) => {
        console.log(data);
        // @ts-ignore
        window.gigya!.accounts.deleteAccount({UID: data.UID});
      }
    });
  }
}
