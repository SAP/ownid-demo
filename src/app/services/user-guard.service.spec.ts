import { Router } from "@angular/router";
import { UserGuardService } from "@services/user-guard.service";
import { GigyaService } from "@services/gigya.service";
import { Observable } from "rxjs";

describe("PersistentStorageService", () => {
  let router: Router;
  let gigyaService: GigyaService;

  beforeEach(() => {
    router = {} as Router;
    router.navigateByUrl = jest.fn();
    gigyaService = {} as GigyaService;
  });

  describe("canActivate", () => {
    it("should return true", () => {
      return new Promise((resolve) => {
        const sut = new UserGuardService(gigyaService, router);
        gigyaService.isLoggedIn = jest.fn().mockReturnValue(
          new Observable<boolean>((subscriber) => subscriber.next(true))
        );

        sut.canActivate().subscribe((canActivate) => {
          expect(canActivate).toBeTruthy();
          resolve();
        });
      });
    });

    it("should return false and navigate to login page", () => {
      return new Promise((resolve) => {
        const sut = new UserGuardService(gigyaService, router);
        gigyaService.isLoggedIn = jest.fn().mockReturnValue(
          new Observable<boolean>((subscriber) => subscriber.next(false))
        );

        sut.canActivate().subscribe((canActivate) => {
          expect(canActivate).toBeFalsy();
          expect(router.navigateByUrl).toBeCalledWith("/login");
          resolve();
        });
      });
    });
  });
});
