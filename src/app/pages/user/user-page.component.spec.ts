import { async, TestBed } from "@angular/core/testing";
import { NgZone, NO_ERRORS_SCHEMA } from "@angular/core";
import { GigyaService } from "@services/gigya.service";
import { AppStore } from "../../app.store";
import { UserPageComponent } from "./user-page.component";
import { SetProfileCommand } from "../sign/commands/set-profile.command";

describe("UserPageComponent", () => {
  let setProfileCommand: SetProfileCommand;
  let gigyaService: GigyaService;

  beforeEach(() => {
    setProfileCommand = {} as SetProfileCommand;
    setProfileCommand.execute = jest.fn();
    gigyaService = {} as GigyaService;
    gigyaService.getProfile = jest
      .fn()
      .mockImplementation((c) => c({ profile: {} }));
  });

  describe("Snapshot", () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          AppStore,
          {
            provide: SetProfileCommand,
            useValue: setProfileCommand
          },
          {
            provide: GigyaService,
            useValue: gigyaService
          }
        ],
        declarations: [UserPageComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    test("check snapshot", () => {
      const fixture = TestBed.createComponent(UserPageComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe("onLink", () => {
    it("should update linked$ with true", () => {
      const appStore = new AppStore();
      const sut = new UserPageComponent(
        appStore,
        new SetProfileCommand(appStore),
        gigyaService,
        new NgZone({})
      );
      sut.onLink();
      expect(sut.linked$.value).toBeTruthy();
    });
  });

  describe("logout", () => {
    it("should call gigyaService.logout", () => {
      const appStore = new AppStore();
      const sut = new UserPageComponent(
        appStore,
        new SetProfileCommand(appStore),
        gigyaService,
        new NgZone({})
      );
      gigyaService.logout = jest.fn();
      sut.onLogout();
      expect(gigyaService.logout).toBeCalled();
    });
  });
});
