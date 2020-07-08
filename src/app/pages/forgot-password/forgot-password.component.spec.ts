import { async, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { GigyaService } from "../../services/gigya.service";
import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
  let fb: FormBuilder;
  let gigyaService: GigyaService;

  beforeEach(() => {
    fb = {} as FormBuilder;
    fb.group = jest.fn().mockReturnValue({ valid: true, value: {} });

    gigyaService = {} as GigyaService;
    gigyaService.resetPassword = jest
      .fn()
      .mockImplementation(
        (params: never, callBack: (data: unknown) => void) => {
          callBack({ status: "OK" });
        }
      );
  });

  describe("Snapshot", () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          {
            provide: FormBuilder,
            useValue: fb
          },
          {
            provide: GigyaService,
            useValue: gigyaService
          }
        ],
        declarations: [ForgotPasswordComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    test("check snapshot", () => {
      const fixture = TestBed.createComponent(ForgotPasswordComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe("controller", () => {
    it("should set form", () => {
      const sut = new ForgotPasswordComponent(fb, gigyaService);

      expect(sut.form).toBeTruthy();
    });
  });

  describe("onSubmit", () => {
    it("should set emailSent to true", () => {
      const sut = new ForgotPasswordComponent(fb, gigyaService);

      sut.onSubmit();

      expect(sut.emailSent).toEqual(true);
    });

    it("should set errors on gigya error", () => {
      const sut = new ForgotPasswordComponent(fb, gigyaService);

      gigyaService.resetPassword = jest
        .fn()
        .mockImplementation(
          (params: never, callBack: (data: unknown) => void) => {
            callBack({ status: "FAIL", errorDetails: { errors: [true] } });
          }
        );

      sut.onSubmit();

      expect(sut.errors).toEqual({ errors: [true] });
      expect(sut.emailSent).toEqual(false);
    });

    it("should not update emailSent when form is invalid", () => {
      fb.group = jest.fn().mockReturnValue({ valid: false });

      const sut = new ForgotPasswordComponent(fb, gigyaService);

      sut.onSubmit();

      expect(sut.emailSent).toEqual(false);
    });
  });
});
