import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SignPageComponent } from './sign-page.component';

describe('SignPageComponent', () => {
  describe('Snapshot', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [SignPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    test('check snapshot', () => {
      const fixture = TestBed.createComponent(SignPageComponent);

      expect(fixture).toMatchSnapshot();
    });
  });

  describe('onLogin', () => {
    it('should call console.log()', () => {
      // eslint-disable-next-line no-console
      console.log = jest.fn();

      const sut = new SignPageComponent();

      sut.onLogin({});

      // eslint-disable-next-line no-console
      expect(console.log).toBeCalled();
    });
  });

  describe('onRegister', () => {
    it('should call console.log()', () => {
      // eslint-disable-next-line no-console
      console.log = jest.fn();

      const sut = new SignPageComponent();

      sut.onRegister({});

      // eslint-disable-next-line no-console
      expect(console.log).toBeCalled();
    });
  });
});
