import { Router } from '@angular/router';
import { UserGuardService } from '@services/user-guard.service';
import { AppStore, IProfile } from '../app.store';

describe('PersistentStorageService', () => {
  let appStore: AppStore;
  let router: Router;

  beforeEach(() => {
    appStore = new AppStore();

    router = {} as Router;
    router.navigateByUrl = jest.fn();
  });

  describe('canActivate', () => {
    it('should return true', () => {
      const sut = new UserGuardService(appStore, router);
      appStore.profile$.next({
        email: 'asd@asd.asd',
      } as IProfile);

      const res = sut.canActivate();

      expect(res).toBeTruthy();
    });

    it('should return false and navigate to login page', () => {
      const sut = new UserGuardService(appStore, router);

      const res = sut.canActivate();

      expect(res).toBeFalsy();
      expect(router.navigateByUrl).toBeCalledWith('/login');
    });
  });
});
