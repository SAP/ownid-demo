import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GigyaService } from '@services/gigya.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let gigyaService: GigyaService;
  let router: Router;

  beforeEach(() => {
    gigyaService = {} as GigyaService;
    gigyaService.register = jest.fn();
    router = {} as Router;
    router.navigateByUrl = jest.fn();
  });

  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          FormBuilder,
          {
            provide: GigyaService,
            useValue: gigyaService,
          },
        ],
        declarations: [RegistrationFormComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(RegistrationFormComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe('register', () => {
    it('should call gigyaService.register and redirect to /account if success', () => {
      const sut = new RegistrationFormComponent(new FormBuilder(), gigyaService, router);
      sut.form.patchValue({ email: 'test@mail.com', password: '1234567' });
      return new Promise((resolve) => {
        gigyaService.register = jest.fn().mockImplementation((data, c) => {
          expect(data).not.toBeNull();
          c({ status: 'OK' });
          expect(gigyaService.register).toBeCalled();
          expect(router.navigateByUrl).toBeCalledWith('/account');
          resolve();
        });
        sut.register();
      });
    });

    it('should call gigyaService.register and redirect set errors if failed', () => {
      return new Promise((resolve) => {
        const sut = new RegistrationFormComponent(new FormBuilder(), gigyaService, router);
        sut.form.patchValue({ email: 'test@mail.com', password: '1234567' });
        const errorDetails = 'fakeDetails';
        gigyaService.register = jest.fn().mockImplementation((data, c) => {
          expect(data).not.toBeNull();
          c({ status: 'FAIL', errorDetails });
          expect(gigyaService.register).toBeCalled();
          expect(sut.errors).toBe(errorDetails);
          resolve();
        });
        sut.register();
      });
    });

    it('should do nothing if form validation fails', () => {
      const sut = new RegistrationFormComponent(new FormBuilder(), gigyaService, router);
      sut.form.patchValue({ email: 'testil.com', password: '' });
      sut.register();
      expect(gigyaService.register).not.toBeCalled();
      expect(sut.errors).toBe(null);
    });
  });

  describe('onSuccessOwnIdResgister', () => {
    it('should do nothing if form validation fails', () => {
      const sut = new RegistrationFormComponent(new FormBuilder(), gigyaService, router);
      const resp = { data: {} };
      sut.onSuccessOwnIdResgister(resp);
      expect(sut.showForm).toBe(true);
      expect(sut.registerResponse).toBe(resp);
    });
  });
});
