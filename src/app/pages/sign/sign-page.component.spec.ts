import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { IOwnidRs, SignPageComponent } from './sign-page.component';

describe('SignPageComponent', () => {
  let router: Router;

  beforeEach(() => {
    router = {} as Router;
    router.navigateByUrl = jest.fn();
  });

  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [SignPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(SignPageComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe('onSuccessLogin', () => {
    it('should redirect to /account and set cookies', () => {
      const sut = new SignPageComponent(router);
      const cookieName = 'fakeName';
      const cookieValue = 'fakeValue';
      sut.onSuccessLogin({ sessionInfo: { cookieName, cookieValue } } as IOwnidRs);
      // expect(router.navigateByUrl).toBeCalledWith('/account');
    });
  });
});
