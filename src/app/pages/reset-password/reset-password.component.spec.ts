import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GigyaService } from '../../services/gigya.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let actRoute: ActivatedRoute;
  let fb: FormBuilder;
  let gigyaService: GigyaService;
  let router: Router;

  beforeEach(() => {
    actRoute = {
      queryParamMap: of({
        get: () => 'pwrt',
      } as Params),
    } as ActivatedRoute;

    fb = {} as FormBuilder;
    fb.group = jest.fn().mockReturnValue({ valid: true, value: {} });

    gigyaService = {} as GigyaService;
    gigyaService.resetPassword = jest.fn().mockImplementation((params: never, callBack: (data: unknown) => void) => {
      callBack({ status: 'OK' })
    });

    router = {} as Router;
    router.navigateByUrl = jest.fn();
  });

  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          {
            provide: FormBuilder,
            useValue: fb
          },
          {
            provide: GigyaService,
            useValue: gigyaService
          },
          {
            provide: ActivatedRoute,
            useValue: actRoute,
          },
        ],
        declarations: [ResetPasswordComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(ResetPasswordComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe('controller', () => {
    it('should set pwrt$', () => {
      return new Promise((resolve) => {
        const sut = new ResetPasswordComponent(
          actRoute,
          fb,
          gigyaService,
          router
        );

        sut.pwrt$.subscribe((val) => {
          expect(val).toEqual('pwrt');
          resolve();
        })

      })
    });
  });

  describe('onSubmit', () => {
    it('should redirect to /login', () => {
      const sut = new ResetPasswordComponent(
        actRoute,
        fb,
        gigyaService,
        router
      );

      sut.onSubmit('token');

      expect(router.navigateByUrl).toBeCalledWith('/login');
    });

    it('should not redirect to /login on gigya error', () => {
      const sut = new ResetPasswordComponent(
        actRoute,
        fb,
        gigyaService,
        router
      );

      gigyaService.resetPassword = jest.fn().mockImplementation((params: never, callBack: (data: unknown) => void) => {
        callBack({ status: 'FAIL', errorDetails: { errors: [true] } })
      });


      sut.onSubmit('token');

      expect(sut.errors).toEqual({ errors: [true] });
      expect(router.navigateByUrl).not.toBeCalledWith('/login');
    });

    it('should not redirect to /login when form is invalid', () => {
      fb.group = jest.fn().mockReturnValue({ valid: false });

      const sut = new ResetPasswordComponent(
        actRoute,
        fb,
        gigyaService,
        router
      );

      sut.onSubmit('token');

      expect(router.navigateByUrl).not.toBeCalledWith('/login');
    });
  });

  describe('onRecover', () => {
    it('should redirect to /login', () => {
      const sut = new ResetPasswordComponent(
        actRoute,
        fb,
        gigyaService,
        router
      );

      sut.onRecover({});

      expect(router.navigateByUrl).toBeCalledWith('/login');
    });
  });
});
