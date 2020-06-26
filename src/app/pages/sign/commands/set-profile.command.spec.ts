import { Router } from "@angular/router";
import { AppStore, IProfile } from "../../../app.store";
import { SetProfileCommand } from "./set-profile.command";

describe("SignPageComponent", () => {
  let appStore: AppStore;
  let router: Router;

  beforeEach(() => {
    appStore = new AppStore();
    appStore.profile$.next = jest.fn();

    router = {} as Router;
    router.navigateByUrl = jest.fn();
  });

  describe("execute", () => {
    it("should update profile value", () => {
      const sut = new SetProfileCommand(appStore);

      sut.execute({ email: "asd@asd.asd" } as IProfile);

      expect(appStore.profile$.next).toBeCalledWith({ email: "asd@asd.asd" });
    });
  });
});
