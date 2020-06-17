import { async, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GigyaService } from "@services/gigya.service";
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginFormComponent } from "./login-form.component";
import { RegistrationFormComponent } from "../registration-form/registration-form.component";

describe("LoginFormComponent", () => {
  let gigyaService: GigyaService;
  let router: Router;

  beforeEach(() => {
    gigyaService = {} as GigyaService;
    gigyaService.login = jest.fn();
    router = {} as Router;
    router.navigateByUrl = jest.fn();
  });

  describe("Snapshot", () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          FormBuilder,
          {
            provide: GigyaService,
            useValue: gigyaService
          }
        ],
        declarations: [LoginFormComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    test("check snapshot", () => {
      const fixture = TestBed.createComponent(LoginFormComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe("login", () => {
    it("should call gigyaService.login and redirect to /account if success", () => {
      const sut = new LoginFormComponent(
        new FormBuilder(),
        gigyaService,
        router
      );
      sut.form.patchValue({ email: "test@mail.com", password: "1234567" });
      return new Promise((resolve) => {
        gigyaService.login = jest.fn().mockImplementation((data, c) => {
          expect(data).not.toBeNull();
          c({ status: "OK" });
          expect(gigyaService.login).toBeCalled();
          expect(router.navigateByUrl).toBeCalledWith("/account");
          resolve();
        });
        sut.login();
      });
    });

    it("should call gigyaService.login and redirect set errors if failed", () => {
      return new Promise((resolve) => {
        const sut = new LoginFormComponent(
          new FormBuilder(),
          gigyaService,
          router
        );
        sut.form.patchValue({ email: "test@mail.com", password: "1234567" });
        const errorDetails = "fakeDetails";
        gigyaService.login = jest.fn().mockImplementation((data, c) => {
          expect(data).not.toBeNull();
          c({ status: "FAIL", errorDetails });
          expect(gigyaService.login).toBeCalled();
          expect(sut.errors).toBe(errorDetails);
          resolve();
        });
        sut.login();
      });
    });

    it("should do nothing if form validation fails", () => {
      const sut = new LoginFormComponent(
        new FormBuilder(),
        gigyaService,
        router
      );
      sut.form.patchValue({ email: "testil.com", password: "" });
      sut.login();
      expect(gigyaService.login).not.toBeCalled();
      expect(sut.errors).toBe(null);
    });
  });
});
