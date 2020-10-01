import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStore, INote, IProfile } from '../app.store';

@Injectable()
export class GigyaService {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private appStore: AppStore,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register({ email, password, firstName, data }: any, callback: (profile: any) => void) {
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
      callback: () => this.ngZone.run(() => {
        this.appStore.profile$.next({} as IProfile);
        this.router.navigateByUrl('/')
      }),
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

  setNotes(notes: INote[]) {
    // @ts-ignore
    window.gigya!.accounts.setAccountInfo({ data: { notes } })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData(data: any, callback: () => void = () => {}) {
    // @ts-ignore
    window.gigya!.accounts.setAccountInfo({
      data,
      callback: () => this.ngZone.run(() => callback())
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addOwnIdConnections(conData: any, callback: () => void = () => {}) {
    // @ts-ignore
    window.gigya!.accounts.getAccountInfo({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      include: 'data', callback: (userData: any) => {
        this.setData({ownIdConnections: [...userData.data.ownIdConnections, ...conData ]}, callback)
      }
    });
  }

  deleteAccount() {
    // @ts-ignore
    window.gigya!.accounts.getAccountInfo({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (data: any) => {
        // @ts-ignore
        window.gigya!.accounts.deleteAccount({ UID: data.UID });
      }
    });
  }

  setOwnidUser(isOwnidUser: boolean, callback: () => void = () => {}) {
    this.appStore.isOwnidUser$.next(isOwnidUser);
    this.setData({ isOwnidUser }, callback)
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
}
